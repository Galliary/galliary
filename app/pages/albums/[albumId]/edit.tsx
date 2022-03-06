import { Suspense } from 'react'
import {
  BlitzPage,
  Head,
  Link,
  Routes,
  useMutation,
  useParam,
  useQuery,
  useRouter,
} from 'blitz'
import updateAlbum from 'app/data/mutations/albums/updateAlbum'
import { AlbumForm } from 'app/components/forms/AlbumForm'
import { CDN } from 'app/utils/cdn'
import getAlbum from 'app/data/queries/albums/getAlbum'
import { useCurrentUser } from 'app/data/hooks/useCurrentUser'
import Layout from 'app/layouts/Layout'
import { FORM_ERROR } from 'app/components/forms/Form'

export const EditAlbum = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const albumId = useParam('albumId', 'string')
  const [album, { setQueryData }] = useQuery(
    getAlbum,
    { id: albumId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    },
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
              const sourceId = values.file
                ? await CDN.upload(values.file)
                : album.sourceId
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
