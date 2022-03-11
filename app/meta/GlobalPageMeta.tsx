import { Head } from 'blitz'
import { OrganizationInfo } from 'app/meta/OrganizationInfo'
import { GalliarySiteInfo } from 'app/pages'

type GlobalPageMetaProps = {
  title?: string
  description?: string
  tags?: string[]
  siteInfo: GalliarySiteInfo
} & (
  | {}
  | {
      imageUrl: string
      imageWidth: string
      imageHeight: string
      imageAlt: string
      imageType: string
    }
)

export const GlobalPageMeta = ({
  title,
  siteInfo,
  ...props
}: GlobalPageMetaProps) => {
  const tags = props.tags ?? siteInfo.tags ?? []
  const description = props.description ?? siteInfo.description
  const name = title ? siteInfo.name + ' | ' + title : siteInfo.name
  const url = siteInfo.url

  const twitter = siteInfo.socials.find((social) => social.type === 'twitter')

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>{name}</title>

      <meta name="description" content={description} />

      <meta property="og:locale" content="en_US" />

      <meta property="og:type" content="website" />

      <meta name="theme-color" content={siteInfo.color} />

      <meta name="keywords" content={tags.toString()} />

      <meta property="og:title" content={name} />
      <meta property="og:description" content={description} />

      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={name} />

      {'imageUrl' in props && (
        <>
          <meta name="twitter:image" content={props.imageUrl} />
          <meta property="og:image" content={props.imageUrl} />
          <meta property="og:image:secure_url" content={props.imageUrl} />
          <meta property="og:image:width" content={props.imageWidth} />
          <meta property="og:image:height" content={props.imageHeight} />
          <meta property="og:image:alt" content={props.imageAlt} />
          <meta property="og:image:type" content={props.imageType} />
        </>
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={name} />
      <meta name="twitter:description" content={description} />

      {twitter && (
        <meta name="twitter:creator" content={`@${twitter.handle}`} />
      )}

      <meta name="darkreader" content={siteInfo.url} />

      <link
        rel="search"
        type="application/opensearchdescription+xml"
        href="/opensearch.xml"
        title={siteInfo.name}
      />

      <OrganizationInfo siteInfo={siteInfo} />
    </Head>
  )
}
