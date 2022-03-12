import { snowflake } from 'app/utils/snowflake'
import db, { GroupMemberRole, UserConnectionType } from 'db'

interface CreateNewUserProps {
  email: string
  nickname?: string
  avatarUrl?: string
  tokens?: {
    accessToken?: string
    refreshToken?: string
  }
}

export const createNewUser = async ({
  email,
  nickname,
  avatarUrl,
  tokens: { accessToken, refreshToken } = {
    accessToken: undefined,
    refreshToken: undefined,
  },
}: CreateNewUserProps): Promise<string> => {
  const userId = snowflake()

  await db.group.create({
    data: {
      id: snowflake(),

      name: userId,
      displayName: 'Personal Group',

      members: {
        create: {
          id: snowflake(),
          role: GroupMemberRole.OWNER,
          user: {
            create: {
              id: userId,
              email,
              username: userId,
              nickname,
              avatarUrl,
              connections: {
                create: {
                  type: UserConnectionType.DISCORD,
                  email,
                  accessToken,
                  refreshToken,
                },
              },
            },
          },
        },
      },
    },
    select: {
      members: {
        select: {
          role: true,
          user: {
            select: {
              id: true,
              role: true,
            },
          },
        },
      },
    },
  })

  return userId
}
