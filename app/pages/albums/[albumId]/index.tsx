import { Suspense } from "react"
import { BlitzPage, Routes, usePaginatedQuery, useParam, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAlbum from "app/albums/queries/getAlbum"
import { HStack, IconButton, Text, useDisclosure, VStack } from "@chakra-ui/react"
import getAlbumImages from "app/albums/queries/getAlbumImages"
import { ImagePreview } from "app/core/components/ImagePreview"
import { CDN } from "app/core/utils/cdn"
import { Link } from "app/core/components/Link"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { DeleteIcon } from "app/core/icons/DeleteIcon"
import { EditIcon } from "app/core/icons/EditIcon"
import { UploadIcon } from "app/core/icons/UploadIcon"
import { Tooltip } from "app/core/components/Tooltip"
import { AddImagePreview } from "app/core/components/AddImagePreview"
import { GalleryViewController } from "app/core/contollers/GalleryViewController"
import { usePage } from "app/core/hooks/usePage"
import { DeleteAlbumModal } from "app/core/modals/DeleteAlbumModal"
import { Banner } from "app/core/components/Banner"

const ITEMS_PER_PAGE = 30

export const Album = () => {
  const currentUser = useCurrentUser()
  const deleteConfirmDisclosure = useDisclosure()
  const albumId = useParam("albumId", "string")
  const [album] = useQuery(getAlbum, { id: albumId })

  const { page } = usePage()

  const [{ images, hasMore }] = usePaginatedQuery(getAlbumImages, {
    albumId: album.id,
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  return (
    <VStack spacing={0} boxSize="full">
      <Banner album={album} />

      <DeleteAlbumModal albumId={album.id} disclosure={deleteConfirmDisclosure} />

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
            "You created this album"
          ) : (
            <>
              <Text as="span">By</Text>{" "}
              <Link href={Routes.UserPage({ userId: album.authorId })}>
                {album.author.nickname ?? album.author.username}
              </Link>
            </>
          )
        }
        data={images}
        hasMore={hasMore}
        addPrompt={<AddImagePreview />}
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
