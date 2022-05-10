const { defaultLocale, locales } = require('./i18n.json')

const config = {
  experimental: {
    outputStandalone: true,
  },
  async redirects() {
    return [
      {
        permanent: true,
        source: '/discord',
        destination: 'https://discord.gg/9txsZrHcme',
      },
    ]
  },
  images: {
    domains: ['cdn.galliary.com'],
  },
  i18n: {
    locales,
    defaultLocale,
  },
}

module.exports = config
