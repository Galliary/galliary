import { Suspense } from 'react'
import {
  BlitzPage,
  Head,
  Routes,
  useMutation,
  useParam,
  useQuery,
  useRouter,
} from 'blitz'
import updateImage from 'app/data/mutations/images/updateImage'
import { ImageForm } from 'app/components/forms/fields/ImageForm'
import { CDN } from 'app/utils/cdn'
import getImage from 'app/data/queries/images/getImage'
import { FORM_ERROR } from 'app/components/forms/Form'
import Layout from 'app/layouts/Layout'

export const EditImage = () => {
  const router = useRouter()
  const imageId = useParam('imageId', 'string')
  const [image, { setQueryData }] = useQuery(
    getImage,
    { id: imageId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    },
  )
  const [updateImageMutation] = useMutation(updateImage)

  return (
    <>
      <Head>
        <title>Edit Image {image.id}</title>
      </Head>

      <div>
        <h1>Edit Image {image.id}</h1>
        <pre>{JSON.stringify(image, null, 2)}</pre>

        <ImageForm
          submitText="Update Image"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateImage}
          initialValues={image}
          onSubmit={async (values) => {
            try {
              const sourceId = values.file
                ? await CDN.upload(values.file)
                : image.sourceId

              const updated = await updateImageMutation({
                id: image.id,
                ...values,
                sourceId,
                oldSourceId: image.sourceId,
                colors: values.__image_color ?? [0, 0, 0],
              })

              if (updated) {
                await setQueryData(updated)
                router.push(
                  Routes.ShowImagePage({
                    albumId: image.albumId,
                    imageId: updated.id,
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
      </div>
    </>
  )
}

const EditImagePage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditImage />
    </Suspense>
  )
}

EditImagePage.authenticate = true
EditImagePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditImagePage
