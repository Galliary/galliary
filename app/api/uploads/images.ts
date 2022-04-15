import formidable from 'formidable-serverless'
import { uploadAlbum, uploadImage } from 'app/services/cdn/server.service'
import { UploadAlbumFieldName } from 'app/services/cdn/client.service'

export const config = {
  api: {
    bodyParser: false,
  },
}

const UploadAlbumApiRoute = async (req, res) => {
  const form = new formidable.IncomingForm()

  form.parse(
    req,
    (err, fields: Record<UploadAlbumFieldName, string>, files) => {
      if (err) {
        return res.status(500).end()
      }

      uploadImage(
        fields[UploadAlbumFieldName.ItemId],
        fields[UploadAlbumFieldName.AlbumId],
        fields[UploadAlbumFieldName.AuthorId],
        fields[UploadAlbumFieldName.AuthorName],
        files,
      )
        .then(() => {
          res.status(200).end()
        })
        .catch((e) => {
          console.error(e)
          res.status(500).end()
        })
    },
  )
}

export default UploadAlbumApiRoute
