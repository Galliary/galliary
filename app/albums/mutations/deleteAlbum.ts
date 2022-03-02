import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { CDN } from "app/core/utils/cdn"

const DeleteAlbum = z.object({
  id: z.string(),
})

export default resolver.pipe(
  resolver.zod(DeleteAlbum),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const album = await db.album.findFirst({ where: { id }, select: { sourceId: true } })

    if (!album) {
      return null
    }

    await CDN.delete(album.sourceId)

    return await db.album.deleteMany({ where: { id, authorId: ctx.session.userId } })
  }
)
