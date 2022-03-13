import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'
import { CDN } from 'app/utils/cdn'

const DeleteImage = z.object({
  id: z.string(),
})

export default resolver.pipe(
  resolver.zod(DeleteImage),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const image = await db.image.findFirst({
      where: { id },
      select: { sourceId: true },
    })

    if (!image) {
      return null
    }

    await CDN.delete(image.sourceId)

    return await db.image.deleteMany({
      where: { id, authorId: ctx.session?.userId },
    })
  },
)
