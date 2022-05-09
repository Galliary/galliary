import {
  Center,
  Container,
  Image,
  Input,
  SimpleGrid,
  useBoolean,
  VStack,
} from '@chakra-ui/react'
import Layout from 'app/layouts/Layout'
import { ChangeEventHandler, useEffect, useState } from 'react'
import { Box } from '@chakra-ui/layout'
import {
  ImagePartial,
  ImageUploader,
  QueuedImage,
  UploadedImage,
} from 'app/components/views/ImageUploader'
import { NextPage } from 'next'
import { getGlobalServerSideProps } from 'app/utils/getGlobalServerSideProps'
import {
  useCreateAlbumMutation,
  useCreateImageFragmentMutation,
  useGetAlbumEditPageLazyQuery,
  useGetAlbumLazyQuery,
  useUpdateAlbumMutation,
} from 'generated/graphql.client'
import { useFormik } from 'formik'
import { UploadType, useImageUpload } from 'app/data/hooks/useImageUpload'
import { useDebounce, useList } from 'react-use'
import { useParam } from 'app/data/hooks/useParam'
import { Maybe } from 'global'

export const getServerSideProps = getGlobalServerSideProps(async () => {
  return {
    props: {},
  }
})

interface Form {
  title: string
  description?: string
}

interface AlbumPartial {
  id: string
  title?: Maybe<string>
  description?: Maybe<string>
}

const DEFAULT_ALBUM_DATA = { title: 'Untitled Album' } as const
const MAX_UPLOAD_AT_A_TIME = 2

const NewAlbumPage: NextPage = () => {
  const albumId = useParam('albumId')

  const [files, fileState] = useList<File | ImagePartial>()
  const [uploadIndex, uploadIndexState] = useList<number>()

  const [album, setAlbum] = useState<AlbumPartial>()

  const [getAlbum] = useGetAlbumEditPageLazyQuery()
  const [createAlbum] = useCreateAlbumMutation()
  const [updateAlbum] = useUpdateAlbumMutation()
  const [createImageFragment] = useCreateImageFragmentMutation()
  const uploadImageFile = useImageUpload()

  const [isLoadingExistingAlbum, setIsLoadingExistingAlbum] = useBoolean(false)

  useEffect(() => {
    if (albumId && !album) {
      setIsLoadingExistingAlbum.on()
      getAlbum({ variables: { id: albumId } }).then(({ data }) => {
        if (data?.album) {
          setAlbum({
            id: data.album.id,
            title: data.album.title,
            description: data.album.description,
          })
          console.log(data.album)
          if (data.album.images && data.album.images.length > 0) {
            fileState.set(data.album.images)
          }
          setIsLoadingExistingAlbum.off()
        }
      })
    }
  }, [isLoadingExistingAlbum, album, albumId])

  const beginUpload = async (index: number, file: File) => {
    if (album) {
      uploadIndexState.push(index)

      const { data: fragment } = await createImageFragment({
        variables: { albumId: album.id },
      }).catch((err) => {
        console.error(err)
        return { data: undefined }
      })

      if (!fragment) {
        throw new Error('Image fragment failed to be created')
      }

      const image = await uploadImageFile(
        fragment.image.id,
        file,
        UploadType.Image,
      )

      if (!image) {
        throw new Error('Image failed to be uploaded')
      }

      fileState.updateAt(index, {
        ...image,
        file,
      })

      uploadIndexState.filter((i) => i !== index)
    }
  }

  useEffect(() => {
    if (files.length > 0 && uploadIndex.length < MAX_UPLOAD_AT_A_TIME) {
      if (album) {
        const index = files.findIndex(
          (f, i) => !('imageExt' in f) && !uploadIndex.includes(i),
        )
        const file = files[index]
        if (file) {
          beginUpload(index, file as File)
        }
      } else {
        createAlbum({
          variables: DEFAULT_ALBUM_DATA,
        }).then((res) => {
          if (res.data) {
            setAlbum({
              id: res.data.album.id,
            })
          }
        })
      }
    }
  }, [album?.id, uploadIndex.length, files.length])

  const form = useFormik<Form>({
    onSubmit(values) {
      if (!album) {
        createAlbum({
          variables: values,
        }).then((res) => {
          if (res.data) {
            setAlbum({
              id: res.data.album.id,
            })
          }
        })
      } else {
        updateAlbum({
          variables: {
            albumId: album.id,
            input: values,
          },
        })
      }
    },
    initialValues: {
      title: album?.title ?? DEFAULT_ALBUM_DATA.title,
      description: album?.description ?? '',
    },
  })

  useEffect(() => {
    if (album) {
      form.setValues({
        title: album?.title ?? DEFAULT_ALBUM_DATA.title,
        description: album?.description ?? undefined,
      })
    }
  }, [album, albumId])

  const onUploadFiles = async (fileList: FileList | null) => {
    if (fileList) {
      fileState.push(...Array.from(fileList))
    }
  }

  const [, cancelDebounce] = useDebounce(() => form.submitForm(), 2000, [
    form.values.title,
    form.values.description,
  ])

  const onFormChange =
    (name: string): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      cancelDebounce()
      form.setFieldValue(name, e.target.value)
    }

  return (
    <Layout>
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
          <VStack spacing={0} w="full" align="center" pt="header.height">
            <Input
              size="none"
              variant="none"
              w="full"
              fontSize="24px"
              zIndex={10}
              color="ui.100"
              textAlign="center"
              name="title"
              value={form.values.title}
              placeholder="Album title"
              onChange={onFormChange('title')}
            />
            <Input
              size="none"
              variant="none"
              w="full"
              fontSize="16px"
              zIndex={10}
              color="ui.80"
              textAlign="center"
              name="description"
              value={form.values.description}
              placeholder="Album description"
              onChange={onFormChange('description')}
            />
          </VStack>
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

        <Box w="full">
          <ImageUploader onUpload={onUploadFiles} />
        </Box>

        <Center>
          <Container>
            <SimpleGrid columns={6} p={10} spacing={1}>
              {files.map((image, i) =>
                'imageExt' in image ? (
                  <UploadedImage
                    key={i}
                    image={image}
                    onDelete={() => fileState.removeAt(i)}
                  />
                ) : (
                  <QueuedImage
                    key={i}
                    file={image}
                    isUploading={uploadIndex.includes(i)}
                  />
                ),
              )}
            </SimpleGrid>
          </Container>
        </Center>
      </VStack>
    </Layout>
  )
}

export default NewAlbumPage
