import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetUser = z.object({
  idOrUsername: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(GetUser),
  async ({ idOrUsername }) => {
    const user = await db.user.findFirst({
      where: {
        OR: [
          { id: idOrUsername },
          {
            username: idOrUsername,
          },
        ],
      },
    })

    if (!user) throw new NotFoundError()

    return user
  },
)
