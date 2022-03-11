import { useMemo } from 'react'
import { MiscMeta } from 'app/meta/MiscMeta'
import { LocaleMeta } from 'app/meta/LocaleMeta'
import packageJson from 'package.json'

const { galliary } = packageJson

export interface GlobalMetaProps {}

const GALLIARY_TAGS = galliary.tags.join(',')

export const GlobalMeta = ({}: GlobalMetaProps) => {
  const twitter = useMemo(
    () => galliary.socials.find((social) => social.type === 'twitter'),
    [],
  )

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta name="theme-color" content={galliary.color} />
      <meta name="keywords" content={GALLIARY_TAGS} />

      <meta property="og:type" content="website" />

      <meta property="og:url" content={galliary.url} />
      <meta property="og:site_name" content={galliary.name} />

      <meta name="twitter:card" content="summary_large_image" />

      {twitter && (
        <meta name="twitter:creator" content={`@${twitter.handle}`} />
      )}

      <MiscMeta />
      <LocaleMeta />
    </>
  )
}
