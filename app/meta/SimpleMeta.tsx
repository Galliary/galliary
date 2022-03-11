import packageJson from 'package.json'
import useTranslation from 'next-translate/useTranslation'
const { galliary } = packageJson

interface SimpleMetaProps {
  title?: string
  description?: string
}

export const SimpleMeta = (props: SimpleMetaProps) => {
  const { t } = useTranslation('common')

  const title = props.title ?? galliary.name
  const description = props.description ?? t('description')

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
