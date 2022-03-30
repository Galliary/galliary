import { SiteDetails } from 'app/constants'
import { Head } from 'blitz'

export const MiscMeta = () => (
  <Head>
    <link
      rel="search"
      type="application/opensearchdescription+xml"
      href="/opensearch.xml"
      title={SiteDetails.Name}
    />
  </Head>
)
