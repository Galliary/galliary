import { useMemo } from 'react'
import { useRouter } from 'blitz'
import { Article } from 'schema-dts'
import { Image, User } from '@prisma/client'
import { jsonLdScriptProps } from 'react-schemaorg'
import { SiteDetails } from 'app/constants'
import { Head } from 'blitz'
import { getImageUrlFromItem } from 'app/services/cdn/client.service'

interface ImagePageProps {
  image: Image & {
    author: User
  }
  tags?: string[]
}

export const ImagePageMeta = ({
  image,
  tags = SiteDetails.Tags,
}: ImagePageProps) => {
  const router = useRouter()
  const url = SiteDetails.Url + router.asPath

  const ARTICLE_STRUCTURED_DATA = useMemo(
    () =>
      jsonLdScriptProps<Article>({
        '@context': 'https://schema.org',
        '@type': 'Article',
        author: image.author.username,
        creator: image.author.username,
        headline: `${image.title ?? 'Untitled Image'} | ${
          SiteDetails.DescriptionShort
        }`,
        name: `${image.title ?? 'Untitled Image'} | ${
          SiteDetails.DescriptionShort
        }`,
        url,
        mainEntityOfPage: url,
        keywords: tags.toString(),
        dateModified: image.updatedAt.toISOString(),
        datePublished: image.createdAt.toISOString(),
        publisher: {
          '@type': 'Organization',
          name: SiteDetails.Name,
          logo: {
            '@type': 'ImageObject',
            url: SiteDetails.Logo,
          },
          sameAs: SiteDetails.Socials.map((social) => social.url),
        },
        image: {
          '@type': 'ImageObject',
          author: image.author.username,
          creator: image.author.username,
          name: `${image.title ?? 'Untitled Image'} - ${
            SiteDetails.DescriptionShort
          }`,
          keywords: tags.toString(),
          description: SiteDetails.Description,
          url,
          embedUrl: getImageUrlFromItem(image),
          contentUrl: getImageUrlFromItem(image),
          thumbnailUrl: getImageUrlFromItem(image),
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
    <Head>
      <meta name="robots" content="index,follow" />

      <link rel="canonical" href={url} />

      <link
        className="dynamic"
        rel="image_src"
        href={getImageUrlFromItem(image)}
      />

      <script {...ARTICLE_STRUCTURED_DATA} />
    </Head>
  )
}
