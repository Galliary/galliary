import { BlitzConfig, sessionMiddleware } from 'blitz'
import { defaultLocale, locales } from './i18n.json'
import { DISCORD_SUPPORT_SERVER_URL } from './app/constants'
import { PermissionManager, Permissions } from './app/utils/permissions'

const config: BlitzConfig = {
  eslint: {
    // TODO: we need to enable this later but eslint packages are being super cringe
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        permanent: true,
        source: '/discord',
        destination: DISCORD_SUPPORT_SERVER_URL,
      },
    ]
  },
  middleware: [
    sessionMiddleware({
      cookiePrefix: 'galliary',
      isAuthorized: ({ ctx, args }) => {
        if (ctx.session && ctx.session.userId) {
          return (
            new PermissionManager(
              ctx.session.permissions ?? Permissions.NONE,
            ).valueOf() !== Permissions.NONE
          )
        }

        return false
      },
    }),
  ],
  images: {
    // TODO: Change to "galliary.com" when supported
    domains: ['cdn.galliary.com'],
  },
  i18n: {
    locales,
    defaultLocale,
  },
}

module.exports = config
