import { useMemo } from 'react'
import { MiscMeta } from 'app/meta/MiscMeta'
import { LocaleMeta } from 'app/meta/LocaleMeta'
import { SiteDetails } from 'app/constants'
import { Head } from 'blitz'

export interface GlobalMetaProps {}

const KEYWORDS = SiteDetails.Tags.join(',')

export const GlobalMeta = ({}: GlobalMetaProps) => {
  const twitter = useMemo(
    () => SiteDetails.Socials.find((social) => social.type === 'twitter'),
    [],
  )

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="theme-color" content={SiteDetails.BrandColor} />
        <meta name="keywords" content={KEYWORDS} />

        <link rel="author" href="/humans.txt" />

        <meta property="og:type" content="website" />

        <meta property="og:url" content={SiteDetails.Url} />
        <meta property="og:site_name" content={SiteDetails.Name} />

        <meta name="twitter:card" content="summary_large_image" />

        {twitter && (
          <meta name="twitter:creator" content={`@${twitter.handle}`} />
        )}
      </Head>
      <MiscMeta />
      <LocaleMeta />
    </>
  )
}
