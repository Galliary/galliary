export const CLOUDFLARE_ACCOUNT_HASH = '8yAzsAP1tGpuA0gIh26SsA'

export const DISCORD_SUPPORT_SERVER_URL = 'https://discord.gg/9txsZrHcme'

export const ENABLED_AUTH_STRATEGIES = [
  'DISCORD',
  'TWITTER',
  'GOOGLE',
  'LINKEDIN',
]

export const BrandColor = '#3574D2'
export const BackgroundColor = '#1B1F2F'

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
  BackgroundColor,

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
