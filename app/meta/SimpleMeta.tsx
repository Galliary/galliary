import Head from 'next/head'
import { SiteDetails } from 'app/constants'

interface SimpleMetaProps {
  title?: string
  description?: string
}

export const SimpleMeta = (props: SimpleMetaProps) => {
  const title = props.title ?? SiteDetails.Name
  const description = props.description ?? SiteDetails.Description

  return (
    <Head>
      <title>{title}</title>

      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />

      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />
    </Head>
  )
}
