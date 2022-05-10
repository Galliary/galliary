import { Suspense } from 'react'

import {
  Center,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react'
import { DeleteAlbumModal } from 'app/components/modals/DeleteAlbumModal'
import { ImagePreview } from 'app/components/views/ImagePreview'
import { GalleryViewController } from 'app/controllers/GalleryViewController'
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
import { SiteDetails } from 'app/constants'
import { Box } from '@chakra-ui/layout'
import { useThumbnailSizing } from 'app/data/hooks/useThumbnailSizing'
import { getImageUrlFromItem } from 'app/services/cdn.service'
import { NextPage } from 'next'
import { useParam } from 'app/data/hooks/useParam'
import {
  useGetAlbumQuery,
  useGetImagesForAlbumQuery,
} from 'generated/graphql.client'
import { useRoutes } from 'app/data/hooks/useRoutes'
import { EditIcon } from 'app/components/icons/EditIcon'

export interface AlbumPageProps {}

export const getServerSideProps = getGlobalServerSideProps<AlbumPageProps>(
  async ({ query, req, res }) => {
    return {
      props: {},
    }
  },
)

const ITEMS_PER_PAGE = 42

const ShowAlbumPage: NextPage<AlbumPageProps> = ({ currentUser }) => {
  const deleteConfirmDisclosure = useDisclosure()
  const boxSize = useThumbnailSizing()
  const Routes = useRoutes()

  const albumId = useParam('albumId')

  const { data: albumData } = useGetAlbumQuery({
    variables: {
      id: albumId,
    },
  })

  const { data: imageData } = useGetImagesForAlbumQuery({
    variables: {
      albumId,
    },
  })

  if (!albumData?.album || !imageData?.images) {
    return null
  }

  const album = albumData.album
  const images = imageData.images

  const filledImages = [
    ...images,
    ...[...Array(ITEMS_PER_PAGE - images.length)].fill(null),
  ]

  return (
    <Layout>
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
        imageUrl={getImageUrlFromItem(album)}
      />

      <VStack spacing={0} boxSize="full">
        <Center
          p={8}
          w="full"
          pos="relative"
          overflow="hidden"
          textAlign="center"
          h={[
            'banner-mobile.height-with-header',
            null,
            'banner.height-with-header',
          ]}
          mt="-header.height"
        >
          <Text
            as="h2"
            fontSize="24px"
            zIndex={10}
            color="ui.100"
            pt="header.height"
          >
            {album.title ?? 'Untitled Album'}
          </Text>
          <Box pos="absolute" inset={0} opacity={0.6} boxSize="full">
            <Box
              pos="absolute"
              inset={0}
              zIndex={1}
              boxSize="full"
              bg="background.full"
              opacity={0.5}
            />
            <Image
              pos="absolute"
              inset={0}
              w="full"
              h="full"
              objectFit="cover"
              objectPosition="center calc(50% + 90px)"
              alt={album.title ?? 'Untitled Album'}
              src={getImageUrlFromItem(album)}
            />
          </Box>
        </Center>

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
                {/*<Tooltip label="Upload Image">
                  <IconButton
                    as={Link}
                    href={Routes.({ albumId: album.id })}
                    aria-label="Upload Image"
                    p={3}
                    icon={<UploadIcon />}
                  />
                </Tooltip>*/}
                <Tooltip label="Edit Album">
                  <IconButton
                    as={Link}
                    href={Routes.toEditAlbumPage(album.id)}
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
                <Link href={Routes.toUserPage(album.authorId)}>
                  {album.author?.nickname ?? album.author?.username}
                </Link>
              </>
            )
          }
          data={filledImages}
          hasMore={false}
          addPrompt={<AddNewItem />}
          onDisplay={(data) =>
            data ? (
              <Box as="li">
                <ImagePreview item={data} />
              </Box>
            ) : (
              <Box as="li" bg="ui.5" boxSize={boxSize} />
            )
          }
        />
      </VStack>
    </Layout>
  )
}

export default ShowAlbumPage
