import { BlitzPage, Routes, useMutation, useParam, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import createImage from "app/images/mutations/createImage"
import { FORM_ERROR, ImageForm } from "app/images/components/ImageForm"
import { Text, VStack } from "@chakra-ui/react"
import { Link } from "app/core/components/Link"
import { CDN } from "app/core/utils/cdn"

const NewImagePage: BlitzPage = () => {
  const router = useRouter()
  const albumId = useParam("albumId", "string")
  const [createImageMutation] = useMutation(createImage)

  return (
    <VStack spacing={4} w="400px" align="stretch">
      <Text textStyle="heading.medium">New Image</Text>

      <ImageForm
        submitText="Create Image"
        onSubmit={async (values) => {
          try {
            const sourceId = await CDN.upload(values.file)

            const image = await createImageMutation({
              ...values,
              sourceId,
              albumId,
            })

            if (image) {
              router.push(
                albumId
                  ? Routes.ShowAlbumPage({ albumId })
                  : Routes.ShowImagePage({ imageId: image.id })
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

      <Link href={Routes.ImagesPage()}>Images</Link>
    </VStack>
  )
}

NewImagePage.authenticate = true
NewImagePage.getLayout = (page) => <Layout title={"Create New Image"}>{page}</Layout>

export default NewImagePage
