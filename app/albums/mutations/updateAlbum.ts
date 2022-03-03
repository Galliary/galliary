import db from "db"
import { z } from "zod"
import { resolver } from "blitz"
import { CDN } from "app/core/utils/cdn"

const UpdateAlbum = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  sourceId: z.string().optional(),
  colors: z.array(z.number()),
})

export default resolver.pipe(
  resolver.zod(UpdateAlbum),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const authorId = ctx.session.userId

    if (!authorId) {
      return null
    }

    const album = await db.album.findFirst({
      select: { sourceId: true },
      where: { id, authorId },
    })

    if (!album) {
      return null
    }

    if (data.sourceId && album.sourceId !== data.sourceId) {
      await CDN.delete(album.sourceId!)
    }

    return await db.album.update({ where: { id }, data })
  }
)
