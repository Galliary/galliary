import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeleteImage = z.object({
  id: z.string(),
})

export default resolver.pipe(
  resolver.zod(DeleteImage),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const image = await db.image.findFirst({
      where: { id },
    })

    if (!image) {
      return null
    }

    return await db.image.deleteMany({
      where: { id, authorId: ctx.session?.userId },
    })
  },
)
