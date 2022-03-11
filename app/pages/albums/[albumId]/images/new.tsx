import {
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
import { CDN } from 'app/utils/cdn'
import { FORM_ERROR } from 'app/components/forms/Form'
import Layout from 'app/layouts/Layout'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}

const NewImagePage: BlitzPage = () => {
  const router = useRouter()
  const albumId = useParam('albumId', 'string')
  const [createImageMutation] = useMutation(createImage)

  return (
    <VStack spacing={4} w="400px" align="stretch">
      <Text textStyle="heading.medium">New Image</Text>

      <ImageForm
        submitText="Create Image"
        onSubmit={async (values) => {
          try {
            const sourceId = await CDN.upload(values.file)

            console.log(values.__image_color)

            const image = await createImageMutation({
              ...values,
              sourceId,
              albumId,
              colors: values.__image_color ?? [0, 0, 0],
            })

            if (image) {
              router.push(
                albumId
                  ? Routes.ShowAlbumPage({ albumId })
                  : Routes.ShowImagePage({
                      albumId: albumId ?? '',
                      imageId: image.id,
                    }),
              )
            }
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
  <Layout title={'Create New Image'}>{page}</Layout>
)

export default NewImagePage
