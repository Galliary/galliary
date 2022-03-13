import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetAlbumsInput
  extends Pick<
    Prisma.AlbumFindManyArgs,
    'where' | 'orderBy' | 'skip' | 'take'
  > {}

export default resolver.pipe(
  async ({ where, orderBy, skip = 0, take = 100 }: GetAlbumsInput, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
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
          include: {
            images: {
              select: {
                id: true,
                sourceId: true,
                createdAt: true,
              },
              take: 3,
              orderBy: { createdAt: 'asc' },
            },
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
