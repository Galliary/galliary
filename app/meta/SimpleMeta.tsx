import packageJson from 'package.json'
const { galliary } = packageJson

interface SimpleMetaProps {
  title?: string
  description?: string
}

export const SimpleMeta = (props: SimpleMetaProps) => {
  const title = props.title ?? galliary.name
  const description = props.description ?? galliary.description

  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />

      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />
    </>
  )
}
