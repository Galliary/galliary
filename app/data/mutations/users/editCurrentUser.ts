import { NotFoundError, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'
import { CDN } from 'app/utils/cdn'

const EditCurrentUser = z.object({
  username: z.string().optional(),
  nickname: z.string().optional(),
  email: z.string().optional(),
  bio: z.string().optional()
})

export default resolver.pipe(
  resolver.zod(EditCurrentUser),
  resolver.authorize(),
  async (input, ctx) => {
    if (!ctx.session?.userId) {
      return null
    }

    const user = await db.user.findFirst({
      where: { id: ctx.session?.userId },
      select: {
        username: true,
        nickname: true,
        email: true,
        bio: true
      },
    })

    if (!user) {
      return new NotFoundError()
    }

    return await db.user.update({
      where: { id: ctx.session?.userId },
      data: {
        username: input.username,
        nickname: input.nickname,
        email: input.email,
        bio: input.bio
      },
    })
  },
)
