import {
  BlitzPage,
  GetServerSideProps,
  Routes,
  useMutation,
  useRouter,
} from 'blitz'
import { Center } from '@chakra-ui/react'
import createAlbum from 'app/data/mutations/albums/createAlbum'
import { AlbumForm } from 'app/components/forms/AlbumForm'
import { CDN } from 'app/utils/cdn'
import { FORM_ERROR } from 'app/components/forms/Form'
import Layout from 'app/layouts/Layout'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}

const NewAlbumPage: BlitzPage = () => {
  const router = useRouter()
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
    </Center>
  )
}

NewAlbumPage.authenticate = true
NewAlbumPage.getLayout = (page) => <Layout>{page}</Layout>

export default NewAlbumPage
