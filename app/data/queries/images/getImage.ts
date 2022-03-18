import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetImage = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.string().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(resolver.zod(GetImage), async ({ id }) => {
  const image = await db.image.findFirst({
    where: { id },
    include: {
      author: { select: { id: true, nickname: true, username: true } },
    },
  })

  if (!image) throw new NotFoundError()

  return image
})
