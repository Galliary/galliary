import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const FavouriteAlbum = z.object({
  id: z.string(),
  unfavourite: z.boolean().optional(),
})

export default resolver.pipe(
  resolver.zod(FavouriteAlbum),
  resolver.authorize(),
  async (input, ctx) => {
    if (!ctx.session?.userId) {
      return null
    }

    return await db.user.update({
      where: {
        id: ctx.session?.userId,
      },
      data: {
        favouriteAlbums: {
          [input.unfavourite ? 'disconnect' : 'connect']: {
            id: input.id,
          },
        },
      },
    })
  },
)
