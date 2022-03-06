import { Strategy } from 'passport-google-oauth20'
import db from 'db'
import { snowflake } from 'app/utils/snowflake'

export const GoogleStrategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID ?? '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL ?? '',
    scope: 'profile email',
  },
  async (accessToken, refreshToken, profile, done) => {
    const email = profile.emails?.[0]?.value

    if (!email) {
      return done(
        new Error('Twitter OAuth response did not supply an email address.'),
      )
    }

    const avatarUrl = profile.photos?.[0]?.value

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
      source: 'google',
    }

    done(undefined, { publicData })
  },
)
