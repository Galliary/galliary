import { NextApiResponse } from 'next'
import multer from 'multer'
import { CloudflareStorage } from 'multer-cloudflare-storage'
import nextConnect from 'next-connect'
import { CDN } from 'app/utils/cdn'

const uploader = multer({
  storage: new CloudflareStorage(CDN.ACCOUNT_ID, CDN.API_KEY),
  limits: {
    files: 1,
    fileSize: 64 * 1024 * 1024,
  },
})

const ImagesApiRoute = nextConnect({
  onError(err) {
    console.error(err)
  },
})

ImagesApiRoute.use(uploader.single('file'))

ImagesApiRoute.post((req, res: NextApiResponse) => {
  const sample = (req as any).file as { destination: string }

  if (sample) {
    res.send(sample.destination)
  } else {
    res.end()
  }
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default ImagesApiRoute
