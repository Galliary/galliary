import packageJson from 'package.json'

const { galliary } = packageJson

export const MiscMeta = () => (
  <>
    {/* Disables dark reader since we have a set dark mode (for now). */}
    <meta name="darkreader" content={galliary.url} />

    {/* Directs apps to our search page more details in our opensearch.xml file. */}
    <link
      rel="search"
      type="application/opensearchdescription+xml"
      href="/opensearch.xml"
      title={galliary.name}
    />
  </>
)
