import { getSession } from 'blitz'
import { UserConnectionType } from 'db'
import { Strategy } from 'passport-google-oauth20'
import { BlitzApiRequest, BlitzApiResponse } from 'next'
import { ConfigService } from 'app/services/config.service'
import { StrategyType } from 'app/auth/utils/strategyWithApi'
import { handleAuthType } from 'app/auth/utils/handleAuthType'

export const SCOPES = ['profile', 'email']

export const GoogleStrategy = (
  req: BlitzApiRequest,
  res: BlitzApiResponse,
  type: StrategyType,
) => {
  const strategyOptions = ConfigService.getStrategyConfig(
    UserConnectionType.GOOGLE,
    type,
  )

  return new Strategy(
    {
      clientID: strategyOptions.clientId,
      clientSecret: strategyOptions.clientSecret,
      callbackURL: strategyOptions.callbackUrl,
      scope: SCOPES.join(' '),
    },
    async (accessToken, refreshToken, profile, done) => {
      const session = await getSession(req, res)

      const email = profile.emails?.[0]?.value

      if (type === StrategyType.Connect && !session.userId) {
        return done(
          new Error('You need to be logged in to connect an account.'),
        )
      }

      if (!email) {
        return done(
          new Error('Google OAuth response did not supply an email address.'),
        )
      }

      const avatarUrl = profile.photos?.[0]?.value

      try {
        done(undefined, {
          publicData: await handleAuthType(type, UserConnectionType.GOOGLE, {
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
