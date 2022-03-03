import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createAlbum from "app/albums/mutations/createAlbum"
import { AlbumForm, FORM_ERROR } from "app/albums/components/AlbumForm"
import { CDN } from "app/core/utils/cdn"

const NewAlbumPage: BlitzPage = () => {
  const router = useRouter()
  const [createAlbumMutation] = useMutation(createAlbum)

  return (
    <div>
      <h1>Create New Album</h1>

      <AlbumForm
        submitText="Create Album"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateAlbum}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const sourceId = await CDN.upload(values.file)
            const album = await createAlbumMutation({
              ...values,
              sourceId,
              colors: values.__image_color ?? [0, 0, 0],
            })
            router.push(Routes.ShowAlbumPage({ albumId: album.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.AlbumsPage()}>
          <a>Albums</a>
        </Link>
      </p>
    </div>
  )
}

NewAlbumPage.authenticate = true
NewAlbumPage.getLayout = (page) => <Layout title={"Create New Album"}>{page}</Layout>

export default NewAlbumPage
