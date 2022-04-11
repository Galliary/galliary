import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdateCurrentUserBannerExt = z.object({
  bannerExt: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateCurrentUserBannerExt),
  resolver.authorize(),
  async (input, ctx) => {
    if (!ctx.session?.userId) {
      return null
    }

    return await db.user.update({
      where: { id: ctx.session.userId },
      data: {
        bannerExt: input.bannerExt,
      },
    })
  },
)
