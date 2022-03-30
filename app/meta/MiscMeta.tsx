import { SiteDetails } from 'app/constants'

export const MiscMeta = () => (
  <>
    {/* Directs apps to our search page more details in our opensearch.xml file. */}
    <link
      rel="search"
      type="application/opensearchdescription+xml"
      href="/opensearch.xml"
      title={SiteDetails.Name}
    />
  </>
)
