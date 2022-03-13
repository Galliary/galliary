import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from 'blitz'
import { defaultLocale, locales } from './i18n.json'

const config: BlitzConfig = {
  eslint: {
    // TODO: we need to enable this later but eslint packages are being super cringe
    ignoreDuringBuilds: true,
  },
  middleware: [
    sessionMiddleware({
      cookiePrefix: 'galliary',
      isAuthorized: simpleRolesIsAuthorized,
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
