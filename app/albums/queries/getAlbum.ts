import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetAlbum = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetAlbum), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const album = await db.album.findFirst({
    where: { id },
    include: { author: { select: { id: true, nickname: true, username: true } } },
  })

  if (!album) throw new NotFoundError()

  return album
})
