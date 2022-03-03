import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAlbum from "app/albums/queries/getAlbum"
import updateAlbum from "app/albums/mutations/updateAlbum"
import { AlbumForm, FORM_ERROR } from "app/albums/components/AlbumForm"
import { CDN } from "app/core/utils/cdn"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

export const EditAlbum = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const albumId = useParam("albumId", "string")
  const [album, { setQueryData }] = useQuery(
    getAlbum,
    { id: albumId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateAlbumMutation] = useMutation(updateAlbum)

  return (
    <>
      <Head>
        <title>Edit Album {album.id}</title>
      </Head>

      <div>
        <h1>Edit Album {album.id}</h1>
        <pre>{JSON.stringify(album, null, 2)}</pre>

        <AlbumForm
          submitText="Update Album"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateAlbum}
          initialValues={album}
          onSubmit={async (values) => {
            try {
              const sourceId = values.file ? await CDN.upload(values.file) : album.sourceId
              const updated = await updateAlbumMutation({
                id: album.id,
                ...values,
                sourceId,
                colors: values.__image_color ?? [0, 0, 0],
              })

              if (!updated) {
                return
              }

              await setQueryData({
                ...updated,
                author: {
                  id: currentUser!.id,
                  username: currentUser!.username,
                  nickname: currentUser!.nickname,
                },
              })

              router.push(Routes.ShowAlbumPage({ albumId: updated.id }))
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

const EditAlbumPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditAlbum />
      </Suspense>

      <p>
        <Link href={Routes.AlbumsPage()}>
          <a>Albums</a>
        </Link>
      </p>
    </div>
  )
}

EditAlbumPage.authenticate = true
EditAlbumPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditAlbumPage
