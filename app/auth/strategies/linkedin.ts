import { getSession } from 'blitz'
import { UserConnectionType } from 'db'
import { Strategy } from 'passport-linkedin-oauth2'
import { BlitzApiRequest, BlitzApiResponse } from 'next'
import { ConfigService } from 'app/services/config.service'
import { StrategyType } from 'app/auth/utils/strategyWithApi'
import { handleAuthType } from 'app/auth/utils/handleAuthType'

export const SCOPES = ['r_emailaddress', 'r_liteprofile']

export const LinkedInStrategy = (
  req: BlitzApiRequest,
  res: BlitzApiResponse,
  type: StrategyType,
) => {
  const strategyOptions = ConfigService.getStrategyConfig(
    UserConnectionType.LINKEDIN,
    type,
  )

  return new Strategy(
    {
      clientID: strategyOptions.clientId,
      clientSecret: strategyOptions.clientSecret,
      callbackURL: strategyOptions.callbackUrl,
      scope: SCOPES,
      profileFields: ['vanityName'],
    },
    async (accessToken, refreshToken, profile, done) => {
      const session = await getSession(req, res)

      if (type === StrategyType.Connect && !session.userId) {
        return done(
          new Error('You need to be logged in to connect an account.'),
        )
      }

      const email = profile.emails?.[0].value

      if (!email) {
        return done(
          new Error('Discord OAuth response did not supply an email address.'),
        )
      }

      const nickname = profile.displayName
      const photos = profile.photos ?? []
      const avatarUrl = photos[photos.length - 1]?.value

      try {
        done(undefined, {
          publicData: await handleAuthType(type, UserConnectionType.LINKEDIN, {
            email,
            avatarUrl,
            userId: session.userId ?? '',
            nickname,
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
