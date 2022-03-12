import { UserConnectionType } from 'db'

export const CLOUDFLARE_ACCOUNT_HASH = '8yAzsAP1tGpuA0gIh26SsA'

export const ENABLED_AUTH_STRATEGIES = [
  UserConnectionType.DISCORD,
  UserConnectionType.TWITTER,
  UserConnectionType.GOOGLE,
  UserConnectionType.LINKEDIN,
]
