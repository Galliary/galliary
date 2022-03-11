import { useMemo } from 'react'
import { galliary } from 'package.json'
import { jsonLdScriptProps } from 'react-schemaorg'
import useTranslation from 'next-translate/useTranslation'
import type { Organization, WebPage, WebSite } from 'schema-dts'

export interface OrganizationInfoProps {}

const WEB_SITE_STRUCTURED_DATA = jsonLdScriptProps<WebSite>({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': galliary.url + '#web',
  url: galliary.url,
  name: galliary.name,
})

export const OrganizationInfo = ({}: OrganizationInfoProps) => {
  const { t } = useTranslation('common')

  const WEB_PAGE_STRUCTURED_DATA = useMemo(
    () =>
      jsonLdScriptProps<WebPage>({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        headline: t('headline'),
        description: t('description'),
        url: galliary.url,
        about: [
          {
            '@type': 'Thing',
            name: galliary.name,
            sameAs: galliary.socials.map((social) => social.url),
          },
        ],
      }),
    [],
  )

  const ORGANIZATION_STRUCTURED_DATA = useMemo(
    () =>
      jsonLdScriptProps<Organization>({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: galliary.name,
        alternateName: t('long-name'),
        url: galliary.url,
        logo: galliary.logo,
        email: galliary.email,
        sameAs: galliary.socials.map((social) => social.url),
      }),
    [],
  )

  return (
    <>
      {/* TODO: Contemplate whether this is necessary or not.
      <script
        {...jsonLdScriptProps<SoftwareApplication>({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: siteInfo.name,
          alternateName: siteInfo.longName,
          url: siteInfo.url,
          description: siteInfo.description,
          operatingSystem: 'Windows, MacOS',
          applicationCategory: 'https://en.wikipedia.org/wiki/Photography',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        })}
      />*/}

      <script {...WEB_SITE_STRUCTURED_DATA} />
      <script {...WEB_PAGE_STRUCTURED_DATA} />
      <script {...ORGANIZATION_STRUCTURED_DATA} />
    </>
  )
}
