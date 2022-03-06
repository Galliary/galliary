import { Strategy } from 'passport-twitter'
import db from 'db'
import { snowflake } from 'app/utils/snowflake'

export const TwitterStrategy = new Strategy(
  {
    includeEmail: true,
    skipExtendedUserProfile: false,
    consumerKey: process.env.TWITTER_CONSUMER_KEY ?? '',
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET ?? '',
    callbackURL: process.env.TWITTER_CALLBACK_URL ?? '',
  },
  async (_token, _tokenSecret, profile, done) => {
    const email = profile._json.email

    if (!email) {
      return done(
        new Error('Twitter OAuth response did not supply an email address.'),
      )
    }

    const avatarUrl = profile._json.profile_image_url_https

    const user = await db.user.upsert({
      where: { email },
      create: {
        id: snowflake(),
        email,
        username: profile.id?.trim(),
        nickname: profile.displayName?.trim(),
        avatarUrl,
      },
      update: { email, nickname: profile.displayName?.trim(), avatarUrl },
    })

    const publicData = {
      userId: user.id,
      roles: [user.role],
      source: 'twitter',
    }

    done(undefined, { publicData })
  },
)
