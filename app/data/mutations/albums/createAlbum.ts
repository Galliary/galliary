import db from 'db'
import { z } from 'zod'
import { resolver } from 'blitz'
import { snowflake } from 'app/utils/snowflake'

const CreateAlbum = z.object({
  title: z.string().max(50).optional(),
  description: z.string().max(150).optional(),
  colors: z.array(z.number()),
  coverExt: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateAlbum),
  resolver.authorize(),
  async (input, ctx) => {
    return await db.album.create({
      data: {
        ...input,
        id: snowflake(),
        authorId: ctx.session?.userId,
      },
    })
  },
)
