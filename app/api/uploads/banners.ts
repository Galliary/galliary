import formidable from 'formidable-serverless'
import { uploadBanner } from 'app/services/cdn/server.service'
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

      uploadBanner(fields[UploadAlbumFieldName.AuthorId], files)
        .then(() => {
          res.status(200).end()
        })
        .catch(() => {
          res.status(500).end()
        })
    },
  )
}

export default UploadAlbumApiRoute
