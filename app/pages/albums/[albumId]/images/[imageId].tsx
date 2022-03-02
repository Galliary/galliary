import Layout from "app/core/layouts/Layout"
import ShowImagePage from "app/pages/images/[imageId]"

const ShowAlbumImagePage = ShowImagePage

ShowImagePage.authenticate = true
ShowImagePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowAlbumImagePage
