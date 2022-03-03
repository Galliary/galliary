import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { CDN } from "app/core/utils/cdn"

const UpdateImage = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  sourceId: z.string(),
  oldSourceId: z.string(),
  colors: z.array(z.number()),
})

export default resolver.pipe(
  resolver.zod(UpdateImage),
  resolver.authorize(),
  async ({ id, oldSourceId, ...data }, ctx) => {
    const image = await db.image.findFirst({
      where: {
        id,
        authorId: ctx.session.userId,
      },
      select: {
        sourceId: true,
      },
    })

    if (!image) {
      return null
    }

    if (data.sourceId && image.sourceId !== data.sourceId) {
      await CDN.delete(image.sourceId)
    }

    return await db.image.update({ where: { id }, data })
  }
)
