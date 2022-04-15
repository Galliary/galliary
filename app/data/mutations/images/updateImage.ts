import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

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
        authorId: ctx.session?.userId,
      },
    })

    if (!image) {
      return null
    }

    return await db.image.update({ where: { id }, data })
  },
)
