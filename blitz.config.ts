import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from 'blitz'

const nextTranslate = require('next-translate')
const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const translate = nextTranslate()
const analyzer = bundleAnalyzer()

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
    domains: ['cdn.galliary.com', 'vitals.vercel-insights.com'],
  },
  i18n: translate.i18n,
  webpack: (config, ...args) => {
    const [{ buildId, dev, isServer, defaultLoaders, webpack }] = args
    const stage_0 = analyzer.webpack(config, ...args)
    return translate.webpack(stage_0, ...args)
  },
}

module.exports = config
