import {
  AuthorizationError,
  BlitzPage,
  GetServerSideProps,
  Routes,
  useMutation,
  useParam,
  useRouter,
} from 'blitz'
import { Text, VStack } from '@chakra-ui/react'
import createImage from 'app/data/mutations/images/createImage'
import { ImageForm } from 'app/components/forms/fields/ImageForm'
import { FORM_ERROR } from 'app/components/forms/Form'
import Layout from 'app/layouts/Layout'
import {
  getAsExt,
  postNextUpload,
  UploadType,
} from 'app/services/cdn/client.service'
import { useCurrentUser } from 'app/data/hooks/useCurrentUser'
import { Suspense } from 'react'
import { Loader } from 'app/components/views/Loader'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}

const NewImagePage: BlitzPage = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const albumId = useParam('albumId', 'string')
  const [createImageMutation] = useMutation(createImage)

  return (
    <VStack spacing={4} w="400px" align="stretch">
      <Text textStyle="heading.medium">New Image</Text>

      <ImageForm
        submitText="Create Image"
        onSubmit={async (values) => {
          const imageExt = getAsExt(values.file)

          if (!currentUser) {
            throw new AuthorizationError()
          }

          try {
            const image = await createImageMutation({
              ...values,
              imageExt,
              albumId,
              colors: values.__image_color ?? [0, 0, 0],
            })

            if (!image) {
              throw new Error('Image not created')
            }

            await postNextUpload(
              UploadType.Image,
              currentUser,
              image,
              values.file,
            )

            await router.push(
              albumId
                ? Routes.ShowAlbumPage({ albumId })
                : Routes.ShowImagePage({
                    albumId: albumId ?? '',
                    imageId: image.id,
                  }),
            )
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </VStack>
  )
}

NewImagePage.authenticate = true
NewImagePage.getLayout = (page) => (
  <Layout>
    <Suspense fallback={<Loader />}>{page}</Suspense>
  </Layout>
)

export default NewImagePage
