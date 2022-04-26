export const MAX_UPLOAD_FILE_SIZE = 64 * 1024 * 1024

export const CDN_URL = 'https://cdn.galliary.com'

export const SUPPORTED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/bmp',
]

export const AUTH_COOKIE_NAME = 'x-g-a'

export const DISCORD_SUPPORT_SERVER_URL = 'https://discord.gg/9txsZrHcme'

export const ENABLED_AUTH_STRATEGIES = [
  'DISCORD',
  'TWITTER',
  'GOOGLE',
  'LINKEDIN',
]

export const BrandColor = '#3574D2'

export const Domain = 'galliary.com'

export const SiteDetails = {
  // Texts
  Name: 'Galliary',
  NameLong: 'Galliary',
  Description: 'Explore, upload or share images, albums and galleries.',
  DescriptionShort: 'Upload or share images.',
  DescriptionLong:
    'Galliary is a social media platform for sharing images, albums and galleries.',
  Tags: [
    'galliary',
    'image',
    'album',
    'gallery',
    'photography',
    'photo',
    'upload',
    'picture',
    'free',
  ],
  Logo: `https://${Domain}/logo.png`,
  Url: `https://${Domain}`,
  Email: `contact@${Domain}`,
  BrandColor,

  // Domain related information
  Domain,
  CdnDomain: `cdn.${Domain}`,

  // Socials
  Socials: [
    {
      type: 'twitter',
      handle: 'GalliaryApp',
      url: 'https://twitter.com/GalliaryApp',
    },
  ],
}
