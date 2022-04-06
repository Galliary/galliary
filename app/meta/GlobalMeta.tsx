import { useMemo } from 'react'
import { MiscMeta } from 'app/meta/MiscMeta'
import { LocaleMeta } from 'app/meta/LocaleMeta'
import { BackgroundColor, SiteDetails } from 'app/constants'
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
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="theme-color" content={SiteDetails.BrandColor} />
        <meta name="keywords" content={KEYWORDS} />

        <link rel="author" href="/humans.txt" />

        <meta property="og:type" content="website" />

        <meta property="og:url" content={SiteDetails.Url} />
        <meta property="og:site_name" content={SiteDetails.Name} />

        <meta name="twitter:card" content="summary_large_image" />

        <link href="/manifest.json" rel="manifest" />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content={SiteDetails.Name} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="msapplication-navbutton-color"
          content={SiteDetails.BrandColor}
        />
        <meta
          name="msapplication-TileColor"
          content={SiteDetails.BackgroundColor}
        />
        <meta
          name="msapplication-TileImage"
          content="/images/icons/icon-144x144.png"
        />
        {/*<meta name="msapplication-config" content="browserconfig.xml" />*/}

        <meta name="application-name" content={SiteDetails.Name} />
        <meta name="msapplication-tooltip" content={SiteDetails.NameLong} />
        <meta name="msapplication-starturl" content="/" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="full-screen" content="yes" />
        <meta name="browsermode" content="application" />
        <meta name="nightmode" content="enable" />
        <meta name="layoutmode" content="standard" />
        <meta name="imagemode" content="force" />
        <meta name="screen-orientation" content="portrait" />

        {twitter && (
          <meta name="twitter:creator" content={`@${twitter.handle}`} />
        )}
      </Head>
      <MiscMeta />
      <LocaleMeta />
    </>
  )
}
