import db, { UserConnectionType } from 'db'
import { StrategyType } from 'app/auth/utils/strategyWithApi'
import { createNewUser } from 'app/auth/utils/createNewUser'
import { UserRole } from '@prisma/client'
import { addUserConnection } from 'app/auth/utils/addUserConnection'
import { updateUserConnection } from 'app/auth/utils/updateUserConnection'
import { Session } from 'blitz'

type UserInfo = {
  userId: string
  email: string
  handle?: string
  nickname?: string
  avatarUrl?: string
  tokens?: {
    accessToken?: string
    refreshToken?: string
  }
}

export const handleAuthType = async (
  type: StrategyType,
  connectionType: UserConnectionType,
  { email, userId, nickname, avatarUrl, handle, tokens }: UserInfo,
): Promise<Session['PublicData']> => {
  const user = await db.user.findFirst({
    where:
      type === StrategyType.Connect
        ? {
            id: userId ?? '',
          }
        : {
            OR: [
              { email },
              {
                connections: {
                  some: {
                    type: connectionType,
                    email,
                  },
                },
              },
            ],
          },
    include: {
      connections: true,
    },
  })

  if (!user) {
    const userId = await createNewUser({
      email,
      nickname,
      avatarUrl,
      tokens,
    })

    return {
      userId,
      role: UserRole.NONE,
    }
  }

  switch (type) {
    case StrategyType.Connect: {
      return await addUserConnection({
        type: connectionType,
        user,
        email,
        tokens,
        handle,
      })
    }
    case StrategyType.Create: {
      return await updateUserConnection({
        type: connectionType,
        user,
        tokens,
        update: {
          email,
          handle,
        },
      })
    }
    default:
      throw new Error('Invalid strategy type.')
  }
}
