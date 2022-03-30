import { Suspense } from 'react'
import {
  BlitzPage,
  Head,
  invokeWithMiddleware,
  PromiseReturnType,
  Routes,
  usePaginatedQuery,
  useParam,
  useQuery,
} from 'blitz'
import { HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import { DeleteAlbumModal } from 'app/components/modals/DeleteAlbumModal'
import getAlbumImages from 'app/data/queries/albums/getAlbumImages'
import { EditIcon } from 'app/components/icons/EditIcon'
import { ImagePreview } from 'app/components/views/ImagePreview'
import { UploadIcon } from 'app/components/icons/UploadIcon'
import { usePage } from 'app/data/hooks/usePage'
import { GalleryViewController } from 'app/controllers/GalleryViewController'
import getAlbum from 'app/data/queries/albums/getAlbum'
import { DeleteIcon } from 'app/components/icons/DeleteIcon'
import { useDisclosure } from '@chakra-ui/hooks'
import { Tooltip } from 'app/components/Tooltip'
import { Link } from 'app/components/Link'
import Layout from 'app/layouts/Layout'
import { AddNewItem } from 'app/components/views/AddNewItem'
import { Loader } from 'app/components/views/Loader'
import { getGlobalServerSideProps } from 'app/utils/getGlobalServerSideProps'
import { SimpleMeta } from 'app/meta/SimpleMeta'
import { ImageMeta } from 'app/meta/ImageMeta'
import { CDN, ImageType } from 'app/utils/cdn'
import { SiteDetails } from 'app/constants'

const ITEMS_PER_PAGE = 30

export interface AlbumPageProps {
  initialAlbum: PromiseReturnType<typeof getAlbum>
  initialAlbumImages: PromiseReturnType<typeof getAlbumImages>
}

export const getServerSideProps = getGlobalServerSideProps<AlbumPageProps>(
  async ({ query, req, res }) => {
    const initialAlbum = await invokeWithMiddleware(
      getAlbum,
      { id: query.albumId },
      { req, res },
    )

    const initialAlbumImages = await invokeWithMiddleware(
      getAlbumImages,
      {
        albumId: initialAlbum.id,
        orderBy: { id: 'asc' },
        skip: ITEMS_PER_PAGE * Number(query.page ?? 0) || 0,
        take: ITEMS_PER_PAGE,
      },
      { req, res },
    )

    return {
      props: {
        initialAlbum,
        initialAlbumImages,
      },
    }
  },
)

const ShowAlbumPage: BlitzPage<AlbumPageProps> = ({
  initialAlbum,
  initialAlbumImages,
  currentUser,
}) => {
  const deleteConfirmDisclosure = useDisclosure()
  const albumId = useParam('albumId', 'string')
  const [album] = useQuery(
    getAlbum,
    { id: albumId },
    { initialData: initialAlbum },
  )

  const { page } = usePage()

  const [{ images, hasMore }] = usePaginatedQuery(
    getAlbumImages,
    {
      albumId: album.id,
      orderBy: { id: 'asc' },
      skip: ITEMS_PER_PAGE * page,
      take: ITEMS_PER_PAGE,
    },
    {
      initialData: initialAlbumImages,
    },
  )

  return (
    <>
      <SimpleMeta
        title={`${SiteDetails.Name} | ${album.title ?? 'Untitled Album'} by ${
          album.author?.nickname ?? album.author?.username
        }`}
        description={album.description ?? SiteDetails.Description}
      />
      <ImageMeta
        imageWidth="1200"
        imageHeight="630"
        imageType="image/png"
        imageAlt={album.title ?? 'Untitled Album'}
        imageUrl={CDN.getImageUrl(album.sourceId, ImageType.Social)}
      />

      <VStack spacing={0} boxSize="full">
        <Suspense fallback={<Loader />}>
          <DeleteAlbumModal
            albumId={album.id}
            disclosure={deleteConfirmDisclosure}
          />
        </Suspense>

        <GalleryViewController
          title={album.title}
          description={album.description}
          itemsPerPage={ITEMS_PER_PAGE}
          actions={
            currentUser &&
            currentUser.id === album.authorId && (
              <HStack spacing={2}>
                <Tooltip label="Upload Image">
                  <IconButton
                    as={Link}
                    href={Routes.NewImagePage({ albumId: album.id })}
                    aria-label="Upload Image"
                    p={3}
                    icon={<UploadIcon />}
                  />
                </Tooltip>
                <Tooltip label="Edit Album">
                  <IconButton
                    as={Link}
                    href={Routes.EditAlbumPage({ albumId: album.id })}
                    aria-label="Edit Album"
                    p={3}
                    icon={<EditIcon />}
                  />
                </Tooltip>
                <Tooltip label="Delete Album">
                  <IconButton
                    aria-label="Delete Album"
                    p={3}
                    icon={<DeleteIcon color="status.bad" />}
                    onClick={deleteConfirmDisclosure.onOpen}
                  />
                </Tooltip>
              </HStack>
            )
          }
          actionSubText={
            currentUser?.id === album.authorId ? (
              'You created this album'
            ) : (
              <>
                <Text as="span">By</Text>{' '}
                <Link href={Routes.UserPage({ userId: album.authorId })}>
                  {album.author.nickname ?? album.author.username}
                </Link>
              </>
            )
          }
          data={images}
          hasMore={hasMore}
          addPrompt={<AddNewItem />}
          onDisplay={(data) => <ImagePreview item={data} />}
        />
      </VStack>
    </>
  )
}

ShowAlbumPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowAlbumPage
