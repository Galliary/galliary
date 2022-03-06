import { Head } from 'next/document'
import { useRouter } from 'blitz'
import { galliary } from 'package.json'
import { OrganizationInfo } from 'app/meta/OrganizationInfo'

type GlobalPageMetaProps = {
  title?: string
  description?: string
  tags?: string[]
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
  description = galliary.description,
  tags = galliary.tags,
  ...props
}: GlobalPageMetaProps) => {
  const router = useRouter()

  const name = title ? galliary.name + ' | ' + title : galliary.name
  const url = galliary.url + router.asPath

  const twitter = galliary.socials.find((social) => social.type === 'twitter')

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>{name}</title>

      <meta name="description" content={description} />

      <meta property="og:locale" content="en_US" />

      <meta property="og:type" content="website" />

      <meta name="theme-color" content={galliary.color} />

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

      <meta name="darkreader" content={galliary.url} />

      <link
        rel="search"
        type="application/opensearchdescription+xml"
        href="/opensearch.xml"
        title={galliary.name}
      />

      <OrganizationInfo />
    </Head>
  )
}
