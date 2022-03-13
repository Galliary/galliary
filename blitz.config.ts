import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from 'blitz'
import { defaultLocale, locales } from './i18n.json'

const nextTranslate = require('next-translate')
const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// For building on vercel: https://github.com/Automattic/node-canvas/issues/1779
if (
  process.env.LD_LIBRARY_PATH == null ||
  !process.env.LD_LIBRARY_PATH.includes(
    `${process.env.PWD}/node_modules/canvas/build/Release:`,
  )
) {
  process.env.LD_LIBRARY_PATH = `${
    process.env.PWD
  }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ''}`
}

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
  i18n: {
    locales,
    defaultLocale,
  },
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above, so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
}

module.exports = bundleAnalyzer(nextTranslate(config))
