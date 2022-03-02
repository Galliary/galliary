import { Strategy } from "passport-discord"
import db from "db"
import { snowflake } from "app/core/utils/snowflake"

export const SCOPES = ["identify", "email", "guilds.join"]

export const DISCORD_API_BASE_ICON_CDN = "https://cdn.discordapp.com/avatars/"

export const DiscordStrategy = new Strategy(
  {
    clientID: process.env.DISCORD_CLIENT_ID ?? "",
    clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
    callbackURL: process.env.DISCORD_CALLBACK_URL ?? "",
    scope: SCOPES,
  },
  async (accessToken, refreshToken, profile, done) => {
    const email = profile.email

    if (!email) {
      return done(new Error("Discord OAuth response did not supply an email address."))
    }

    const avatarUrl = DISCORD_API_BASE_ICON_CDN + `${profile.id}/${profile.avatar}.png`

    const user = await db.user.upsert({
      where: { email },
      create: {
        id: snowflake(),
        email,
        username: profile.id?.trim(),
        nickname: profile.username?.trim(),
        avatarUrl,
      },
      update: { email, nickname: profile.username?.trim(), avatarUrl },
    })

    const publicData = {
      userId: user.id,
      roles: [user.role],
      source: "discord",
    }

    done(undefined, { publicData })
  }
)
