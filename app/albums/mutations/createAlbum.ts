import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { snowflake } from "app/core/utils/snowflake"

const CreateAlbum = z.object({
  sourceId: z.string().optional(),
  title: z.string().min(2).max(50),
  description: z.string().min(1).max(150),
  colors: z.array(z.number()),
})

export default resolver.pipe(
  resolver.zod(CreateAlbum),
  resolver.authorize(),
  async (input, ctx) => {
    return await db.album.create({
      data: {
        ...input,
        id: snowflake(),
        authorId: ctx.session.userId,
      },
    })
  }
)
