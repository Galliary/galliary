import {
  AuthorizationError,
  BlitzPage,
  GetServerSideProps,
  Routes,
  useMutation,
  useRouter,
} from 'blitz'
import { Center, Container, Image, Text, VStack, Wrap } from '@chakra-ui/react'
import createAlbum from 'app/data/mutations/albums/createAlbum'
import { AlbumForm } from 'app/components/forms/AlbumForm'
import { FORM_ERROR } from 'app/components/forms/Form'
import Layout from 'app/layouts/Layout'
import {
  getAsExt,
  postNextUpload,
  UploadType,
} from 'app/services/cdn/client.service'
import { useCurrentUser } from 'app/data/hooks/useCurrentUser'
import { Suspense, useState } from 'react'
import { Loader } from 'app/components/views/Loader'
import { useDisclosure } from '@chakra-ui/hooks'
import { useThumbnailSizing } from 'app/data/hooks/useThumbnailSizing'
import { usePage } from 'app/data/hooks/usePage'
import { Box } from '@chakra-ui/layout'
import { ImageUploader } from 'app/components/views/ImageUploader'
import { getDataUriForBlob } from 'app/utils/files'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}

const _NewAlbumPage: BlitzPage = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const [createAlbumMutation] = useMutation(createAlbum)

  return (
    <Center boxSize="full">
      <AlbumForm
        submitText="Create Album"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateAlbum}
        // initialValues={{}}
        onSubmit={async (values) => {
          const coverExt = getAsExt(values.file)

          if (!currentUser) {
            throw new AuthorizationError()
          }

          try {
            const album = await createAlbumMutation({
              ...values,
              colors: values.__image_color ?? [0, 0, 0],
              coverExt,
            })

            await postNextUpload(
              UploadType.Album,
              currentUser,
              album,
              values.file,
            )

            await router.push(Routes.ShowAlbumPage({ albumId: album.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </Center>
  )
}

const EMPTY_ITEMS = [...Array(12)].fill(undefined)

const NewAlbumPage: BlitzPage = () => {
  const [items, setItems] = useState<Array<string | undefined>>([])

  const onUploadFiles = (startIndex: number, fileList: FileList | null) => {
    if (fileList) {
      Promise.all(Array.from(fileList).map(getDataUriForBlob)).then((files) => {
        setItems((_currentItems) => {
          const currentItems = [..._currentItems]

          let currentIndex = startIndex
          let handledFileIndex = 0

          const handleFile = () => {
            if (currentItems[currentIndex] !== undefined) {
              currentIndex++
              return handleFile()
            }
            currentItems[currentIndex] = files[handledFileIndex]
            handledFileIndex++
            return handledFileIndex < files.length && handleFile()
          }

          handleFile()

          return currentItems
        })
      })
    }
  }

  return (
    <>
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
            Untitled Album
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
              bg="flow.60"
              pos="absolute"
              inset={0}
              w="full"
              h="full"
              objectFit="cover"
              objectPosition="center calc(50% + 90px)"
              alt="Untitled Album"
              src={'?'}
            />
          </Box>
        </Center>

        <Center>
          <Container>
            <Wrap p={10} spacing={1}>
              {[...items, ...EMPTY_ITEMS].map((maybeSource, i) => (
                <ImageUploader
                  key={i}
                  uploadedImageSrc={maybeSource}
                  onUpload={(fileList) => onUploadFiles(i, fileList)}
                />
              ))}
            </Wrap>
          </Container>
        </Center>
      </VStack>
    </>
  )
}

// NewAlbumPage.authenticate = true
NewAlbumPage.getLayout = (page) => (
  <Layout>
    <Suspense fallback={<Loader />}>{page}</Suspense>
  </Layout>
)

export default NewAlbumPage
