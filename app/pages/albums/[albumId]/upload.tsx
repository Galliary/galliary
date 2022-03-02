import NewImagePage from "app/pages/images/new"
import Layout from "app/core/layouts/Layout"

export const UploadAlbumImage = NewImagePage

UploadAlbumImage.authenticate = true
UploadAlbumImage.getLayout = (page) => <Layout title={"Upload New Album Image"}>{page}</Layout>

export default UploadAlbumImage
