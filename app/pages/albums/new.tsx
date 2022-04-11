import {
  AuthorizationError,
  BlitzPage,
  GetServerSideProps,
  Routes,
  useMutation,
  useRouter,
} from 'blitz'
import { Center } from '@chakra-ui/react'
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
import { Suspense } from 'react'
import { Loader } from 'app/components/views/Loader'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}

const NewAlbumPage: BlitzPage = () => {
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

NewAlbumPage.authenticate = true
NewAlbumPage.getLayout = (page) => (
  <Layout>
    <Suspense fallback={<Loader />}>{page}</Suspense>
  </Layout>
)

export default NewAlbumPage
