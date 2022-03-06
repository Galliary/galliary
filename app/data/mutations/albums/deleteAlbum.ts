import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'
import { CDN } from 'app/utils/cdn'

const DeleteAlbum = z.object({
  id: z.string(),
})

export default resolver.pipe(
  resolver.zod(DeleteAlbum),
  resolver.authorize(),
  async ({ id }, ctx) => {
    if (!ctx.session.userId) {
      return null
    }

    const album = await db.album.findFirst({
      where: { id },
      select: { sourceId: true, images: true },
    })

    if (!album) {
      return null
    }

    if (album.images.length !== 0) {
      return null
    }

    if (album.sourceId) {
      await CDN.delete(album.sourceId)
    }

    return await db.album.deleteMany({
      where: { id, authorId: ctx.session.userId },
    })
  },
)
