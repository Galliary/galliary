import { UserConnectionType } from 'db'

export const CLOUDFLARE_ACCOUNT_HASH = '8yAzsAP1tGpuA0gIh26SsA'

export const DISCORD_SUPPORT_SERVER_URL = 'https://discord.gg/9txsZrHcme'

export const ENABLED_AUTH_STRATEGIES = [
  UserConnectionType.DISCORD,
  UserConnectionType.TWITTER,
  UserConnectionType.GOOGLE,
  UserConnectionType.LINKEDIN,
]
