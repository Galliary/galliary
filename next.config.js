const { defaultLocale, locales } = require('./i18n.json')

const config = {
  eslint: {
    // TODO: we need to enable this later but eslint packages are being super cringe
    ignoreDuringBuilds: true,
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
    // TODO: Change to "galliary.com" when supported
    domains: ['cdn.galliary.com'],
  },
  i18n: {
    locales,
    defaultLocale,
  },
}

module.exports = config
