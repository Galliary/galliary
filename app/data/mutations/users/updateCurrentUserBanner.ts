import { NotFoundError, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'
import { CDN } from 'app/utils/cdn'

const UpdateCurrentUserBanner = z.object({
  bannerSourceId: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(UpdateCurrentUserBanner),
  resolver.authorize(),
  async (input, ctx) => {
    if (!ctx.session?.userId) {
      return null
    }

    const user = await db.user.findFirst({
      where: { id: ctx.session?.userId },
      select: {
        bannerSourceId: true,
      },
    })

    if (!user) {
      return new NotFoundError()
    }

    if (user.bannerSourceId) {
      await CDN.delete(user.bannerSourceId)
    }

    return await db.user.update({
      where: { id: ctx.session?.userId },
      data: {
        bannerSourceId: input.bannerSourceId,
      },
    })
  },
)
