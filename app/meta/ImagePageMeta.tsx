import { useRouter } from 'blitz'
import { Article } from 'schema-dts'
import { galliary } from 'package.json'
import { Image, User } from '@prisma/client'
import { CDN, ImageType } from 'app/utils/cdn'
import { jsonLdScriptProps } from 'react-schemaorg'
import { useMemo } from 'react'
import useTranslation from 'next-translate/useTranslation'

interface ImagePageProps {
  image: Image & {
    author: User
  }
  tags?: string[]
}

export const ImagePageMeta = ({
  image,
  tags = galliary.tags,
}: ImagePageProps) => {
  const router = useRouter()
  const { t } = useTranslation('common')

  const url = galliary.url + router.asPath

  const ARTICLE_STRUCTURED_DATA = useMemo(
    () =>
      jsonLdScriptProps<Article>({
        '@context': 'https://schema.org',
        '@type': 'Article',
        author: image.author.username,
        creator: image.author.username,
        headline: `${image.title ?? t('defaults.image-name')} | ${t('short')}`,
        name: `${image.title ?? t('defaults.image-name')} | ${t('short')}`,
        url,
        mainEntityOfPage: url,
        keywords: tags.toString(),
        dateModified: image.updatedAt.toISOString(),
        datePublished: image.createdAt.toISOString(),
        publisher: {
          '@type': 'Organization',
          name: galliary.name,
          logo: {
            '@type': 'ImageObject',
            url: galliary.logo,
          },
          sameAs: galliary.socials.map((social) => social.url),
        },
        image: {
          '@type': 'ImageObject',
          author: image.author.username,
          creator: image.author.username,
          name: `${image.title ?? t('defaults.image-name')} - ${t('short')}`,
          keywords: tags.toString(),
          description: t('description'),
          url,
          embedUrl: CDN.getImageUrl(image.sourceId, ImageType.Large),
          contentUrl: CDN.getImageUrl(image.sourceId, ImageType.Public),
          thumbnailUrl: CDN.getImageUrl(image.sourceId, ImageType.Medium),
          width: '256',
          height: '256',
          dateCreated: image.createdAt.toISOString(),
          uploadDate: image.createdAt.toISOString(),
          representativeOfPage: true,
        },
      }),
    [],
  )

  return (
    <>
      <meta name="robots" content="index,follow" />

      <link rel="canonical" href={url} />

      <link
        className="dynamic"
        rel="image_src"
        href={CDN.getImageUrl(image.sourceId, ImageType.Public)}
      />

      <script {...ARTICLE_STRUCTURED_DATA} />
    </>
  )
}
