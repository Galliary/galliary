import { Ctx } from "blitz"
import db from "db"

export default async function updateCurrentUser(_ = null, { session }: Ctx) {
  if (!session.userId) {
    return null
  }

  return await db.user.findFirst({
    where: { id: session.userId },
    select: { id: true, username: true, nickname: true, avatarUrl: true },
  })
}
