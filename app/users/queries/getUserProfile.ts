import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetUserProfile = z.object({
  idOrUsername: z.string().optional(),
})

export default resolver.pipe(resolver.zod(GetUserProfile), async ({ idOrUsername }, ctx) => {
  const user = await db.user.findFirst({
    where: {
      OR: [
        { id: idOrUsername },
        {
          username: idOrUsername,
        },
      ],
    },
    include: {
      favouriteUsers: {
        select: {
          id: true,
          username: true,
          nickname: true,
          avatarUrl: true,
        },
        take: 6,
      },
      favouriteImages: {
        select: {
          id: true,
          title: true,
          albumId: true,
          sourceId: true,
        },
        take: 6,
      },
      favouriteAlbums: {
        select: {
          id: true,
          title: true,
          sourceId: true,
        },
        take: 6,
      },
      userFavourites: {
        select: {
          id: true,
        },
        where: {
          id: ctx.session.userId ?? "",
        },
      },
      albums: {
        take: 3,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          images: {
            select: { id: true, albumId: true, sourceId: true, createdAt: true },
            take: 3,
            orderBy: { createdAt: "asc" },
          },
          userFavourites: {
            select: {
              id: true,
            },
            where: {
              id: ctx.session.userId ?? "",
            },
          },
        },
      },
      images: {
        take: 3,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          userFavourites: {
            select: {
              id: true,
            },
            where: {
              id: ctx.session.userId ?? "",
            },
          },
        },
      },
    },
  })

  if (!user) throw new NotFoundError()

  return user
})
