import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'
import { z } from 'zod'

interface GetAlbumsInput
  extends Pick<
    Prisma.AlbumFindManyArgs,
    'where' | 'orderBy' | 'skip' | 'take'
  > {}

export default resolver.pipe(
  resolver.zod(
    z.object({
      where: z.any(),
      orderBy: z.any(),
      skip: z.number(),
      take: z.number(),
    }),
  ),
  async ({ where, orderBy, skip = 0, take = 100 }: GetAlbumsInput, ctx) => {
    const {
      items: albums,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.album.count({ where }),
      query: (paginateArgs) =>
        db.album.findMany({
          ...paginateArgs,
          where,
          orderBy,
          select: {
            id: true,
            title: true,
            coverExt: true,
            createdAt: true,
            authorId: true,
            colors: true,
            userFavourites: {
              select: {
                id: true,
              },
              where: {
                id: ctx.session?.userId ?? '',
              },
            },
          },
        }),
    })

    return {
      albums,
      nextPage,
      hasMore,
      count,
    }
  },
)
