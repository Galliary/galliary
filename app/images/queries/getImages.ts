import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetImagesInput
  extends Pick<Prisma.ImageFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(async ({ where, orderBy, skip = 0, take = 100 }: GetImagesInput) => {
  const {
    items: images,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip,
    take,
    count: () => db.image.count({ where }),
    query: (paginateArgs) => db.image.findMany({ ...paginateArgs, where, orderBy }),
  })

  return {
    images,
    nextPage,
    hasMore,
    count,
  }
})
