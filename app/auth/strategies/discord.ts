import { getSession } from 'blitz'
import { UserConnectionType } from 'db'
import { Strategy } from 'passport-discord'
import { BlitzApiRequest, BlitzApiResponse } from 'next'
import { ConfigService } from 'app/services/config.service'
import { StrategyType } from 'app/auth/utils/strategyWithApi'
import { handleAuthType } from 'app/auth/utils/handleAuthType'

export const SCOPES = ['identify', 'email', 'guilds.join']

export const DISCORD_API_BASE_ICON_CDN = 'https://cdn.discordapp.com/avatars/'

export const DiscordStrategy = (
  req: BlitzApiRequest,
  res: BlitzApiResponse,
  type: StrategyType,
) => {
  const strategyOptions = ConfigService.getStrategyConfig(
    UserConnectionType.DISCORD,
    type,
  )

  return new Strategy(
    {
      clientID: strategyOptions.clientId,
      clientSecret: strategyOptions.clientSecret,
      callbackURL: strategyOptions.callbackUrl,
      scope: SCOPES,
    },
    async (accessToken, refreshToken, profile, done) => {
      const session = await getSession(req, res)

      const email = profile.email

      if (type === StrategyType.Connect && !session.userId) {
        return done(
          new Error('You need to be logged in to connect an account.'),
        )
      }

      if (!email) {
        return done(
          new Error('Discord OAuth response did not supply an email address.'),
        )
      }

      const avatarUrl =
        DISCORD_API_BASE_ICON_CDN + `${profile.id}/${profile.avatar}.png`

      try {
        done(undefined, {
          publicData: await handleAuthType(type, UserConnectionType.DISCORD, {
            email,
            avatarUrl,
            userId: session.userId ?? '',
            nickname: profile.username,
            tokens: {
              accessToken,
              refreshToken,
            },
          }),
        })
      } catch (err) {
        done(err)
      }
    },
  )
}
