import db from 'db'
import { z } from 'zod'
import { resolver } from 'blitz'

const UpdateAlbum = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  sourceId: z.string().optional(),
  colors: z.array(z.number()),
})

export default resolver.pipe(
  resolver.zod(UpdateAlbum),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const authorId = ctx.session?.userId

    if (!authorId) {
      return null
    }

    const album = await db.album.findFirst({
      where: { id, authorId },
    })

    if (!album) {
      return null
    }

    return await db.album.update({ where: { id }, data })
  },
)
