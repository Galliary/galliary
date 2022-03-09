import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetAlbumImagesInput
  extends Pick<
    Prisma.AlbumFindManyArgs,
    'where' | 'orderBy' | 'skip' | 'take'
  > {
  albumId: string
}

export default resolver.pipe(
  async (
    { albumId, where, orderBy, skip = 0, take = 100 }: GetAlbumImagesInput,
    ctx,
  ) => {
    const {
      items: images,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.image.count({ where: { albumId } }),
      query: (paginateArgs) =>
        db.image.findMany({
          ...paginateArgs,
          where: { albumId },
          orderBy,
          include: {
            userFavourites: {
              select: {
                id: true,
              },
              where: {
                id: ctx.session.userId ?? '',
              },
            },
          },
        }),
    })

    return {
      images,
      nextPage,
      hasMore,
      count,
    }
  },
)