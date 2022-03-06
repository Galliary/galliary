import { passportAuth } from 'blitz'
import { DiscordStrategy } from 'app/auth/strategies/discord'
import { TwitterStrategy } from 'app/auth/strategies/twitter'
import { GoogleStrategy } from 'app/auth/strategies/google'

export default passportAuth({
  successRedirectUrl: '/',
  errorRedirectUrl: '/',
  strategies: [
    {
      strategy: TwitterStrategy,
    },
    {
      strategy: DiscordStrategy,
    },
    {
      strategy: GoogleStrategy,
    },
  ],
})
