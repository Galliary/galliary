import db, { User, UserConnection, UserConnectionType } from 'db'
import { Session } from 'blitz'

interface AddUserConnectionProps {
  type: UserConnectionType
  user: User & { connections: UserConnection[] }
  email: string
  handle?: string
  tokens?: {
    accessToken?: string
    refreshToken?: string
  }
}

export const addUserConnection = async ({
  type,
  user,
  email,
  handle,
  tokens,
}: AddUserConnectionProps): Promise<Session['PublicData']> => {
  const existingConnection = user.connections.find(
    (conn) => conn.type === type && conn.email === email,
  )

  if (existingConnection) {
    throw new Error('You already have this connection.')
  }

  const publicData = {
    userId: user.id,
    role: user.role,
  }

  const connectionAlreadyExists = await db.userConnection.findFirst({
    where: {
      type,
      email,
    },
  })

  if (!connectionAlreadyExists) {
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        connections: {
          create: {
            type,
            email,
            handle,
            accessToken: tokens?.accessToken,
            refreshToken: tokens?.refreshToken,
          },
        },
      },
    })

    return publicData
  }

  if (connectionAlreadyExists.userId !== user.id) {
    throw new Error('This connection was already added by another user.')
  }

  if (connectionAlreadyExists.userId === user.id) {
    throw new Error('You already have this connection.')
  }

  throw new Error('There was a problem with connecting your account.')
}
