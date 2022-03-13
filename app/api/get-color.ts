import { getPaletteFromURL } from 'color-thief-node'
import { BlitzApiRequest, BlitzApiResponse } from 'next'

const GetColorApi = async (req: BlitzApiRequest, res: BlitzApiResponse) =>
  res.json({
    colors: await getPaletteFromURL(req.body as string, 8, 1),
  })

export default GetColorApi
