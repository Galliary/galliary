import { getSession } from 'blitz'
import { UserConnectionType } from 'db'
import { Strategy } from 'passport-twitter'
import { BlitzApiRequest, BlitzApiResponse } from 'next'
import { ConfigService } from 'app/services/config.service'
import { StrategyType } from 'app/auth/utils/strategyWithApi'
import { handleAuthType } from 'app/auth/utils/handleAuthType'

export const TwitterStrategy = (
  req: BlitzApiRequest,
  res: BlitzApiResponse,
  type: StrategyType,
) => {
  const strategyOptions = ConfigService.getStrategyConfig(
    UserConnectionType.TWITTER,
    type,
  )

  return new Strategy(
    {
      includeEmail: true,
      skipExtendedUserProfile: false,
      consumerKey: strategyOptions.clientId,
      consumerSecret: strategyOptions.clientSecret,
      callbackURL: strategyOptions.callbackUrl,
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
          new Error('Twitter OAuth response did not supply an email address.'),
        )
      }

      const avatarUrl = (profile.photos?.[0]?.value ?? '').replace(
        '_normal',
        '',
      )

      try {
        done(undefined, {
          publicData: await handleAuthType(type, UserConnectionType.TWITTER, {
            email,
            avatarUrl,
            userId: session.userId ?? '',
            handle: profile.username,
            nickname: profile.displayName,
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
