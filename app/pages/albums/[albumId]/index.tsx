import { Suspense } from 'react'
import { BlitzPage, Routes, usePaginatedQuery, useParam, useQuery } from 'blitz'
import { HStack, IconButton, VStack, Text } from '@chakra-ui/react'
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
import { useCurrentUser } from 'app/data/hooks/useCurrentUser'
import { Tooltip } from 'app/components/Tooltip'
import { Link } from 'app/components/Link'
import Layout from 'app/layouts/Layout'
import { AddNewItem } from 'app/components/views/AddNewItem'

const ITEMS_PER_PAGE = 30

export const Album = () => {
  const currentUser = useCurrentUser()
  const deleteConfirmDisclosure = useDisclosure()
  const albumId = useParam('albumId', 'string')
  const [album] = useQuery(getAlbum, { id: albumId })

  const { page } = usePage()

  const [{ images, hasMore }] = usePaginatedQuery(getAlbumImages, {
    albumId: album.id,
    orderBy: { id: 'asc' },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  return (
    <VStack spacing={0} boxSize="full">
      <DeleteAlbumModal
        albumId={album.id}
        disclosure={deleteConfirmDisclosure}
      />

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
  )
}

const ShowAlbumPage: BlitzPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Album />
      </Suspense>
    </>
  )
}

ShowAlbumPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowAlbumPage
