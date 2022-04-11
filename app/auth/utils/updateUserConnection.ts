import db, { User, UserConnection, UserConnectionType } from 'db'
import { PublicData, Session } from 'blitz'

interface UpdateUserConnectionProps {
  type: UserConnectionType
  user: User & { connections: UserConnection[] }
  update: {
    email: string
    handle?: string
    avatarUrl?: string
  }
  tokens?: {
    accessToken?: string
    refreshToken?: string
  }
}

export const updateUserConnection = async ({
  type,
  user,
  update,
  tokens,
}: UpdateUserConnectionProps): Promise<Session['PublicData']> => {
  const existingConnection = user.connections.find(
    (conn) => conn.type === type && conn.email === update.email,
  )

  const publicData: PublicData = {
    userId: user.id,
    permissions: user.permissions,
  }

  if (!existingConnection) {
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        avatarUrl: update.avatarUrl,
        connections: {
          create: {
            type,
            email: update.email,
            handle: update.handle,
            accessToken: tokens?.accessToken,
            refreshToken: tokens?.refreshToken,
          },
        },
      },
    })

    return publicData
  }

  if (existingConnection.email !== update.email) {
    throw new Error('You already have a Discord account linked to Galliary.')
  } else {
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        avatarUrl: update.avatarUrl,
        connections: {
          update: {
            where: {
              email_type: {
                type,
                email: update.email,
              },
            },
            data: {
              accessToken: tokens?.accessToken,
              refreshToken: tokens?.refreshToken,
            },
          },
        },
      },
    })

    return publicData
  }
}
