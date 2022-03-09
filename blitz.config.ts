import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from 'blitz'
import { SupportedLocales } from 'types'

export const DEFAULT_LOCAL = SupportedLocales.English

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
    domains: ['synqat.gg'],
  },
  i18n: {
    locales: [SupportedLocales.English],
    defaultLocale: DEFAULT_LOCAL,
  },
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
}

module.exports = config
