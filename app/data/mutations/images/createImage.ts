import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'
import { snowflake } from 'app/utils/snowflake'

const CreateImage = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  albumId: z.string(),
  sourceId: z.string(),
  colors: z.array(z.number()),
})

export default resolver.pipe(
  resolver.zod(CreateImage),
  resolver.authorize(),
  async (input, ctx) => {
    if (!ctx.session?.userId) {
      return null
    }

    return await db.image.create({
      data: {
        ...input,
        id: snowflake(),
        authorId: ctx.session?.userId,
      },
    })
  },
)
