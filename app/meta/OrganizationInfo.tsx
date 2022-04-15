import { useMemo } from 'react'
import { jsonLdScriptProps } from 'react-schemaorg'
import type { Organization, WebPage, WebSite } from 'schema-dts'
import { SiteDetails } from 'app/constants'
import { Head } from 'blitz'

export interface OrganizationInfoProps {}

const WEB_SITE_STRUCTURED_DATA = jsonLdScriptProps<WebSite>({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': SiteDetails.Url + '#web',
  url: SiteDetails.Url,
  name: SiteDetails.Name,
})

export const OrganizationInfo = ({}: OrganizationInfoProps) => {
  const WEB_PAGE_STRUCTURED_DATA = useMemo(
    () =>
      jsonLdScriptProps<WebPage>({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        headline: SiteDetails.DescriptionLong,
        description: SiteDetails.Description,
        url: SiteDetails.Url,
        about: [
          {
            '@type': 'Thing',
            name: SiteDetails.Name,
            sameAs: SiteDetails.Socials.map((social) => social.url),
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
        name: SiteDetails.Name,
        alternateName: SiteDetails.NameLong,
        url: SiteDetails.Url,
        logo: SiteDetails.Logo,
        email: SiteDetails.Email,
        sameAs: SiteDetails.Socials.map((social) => social.url),
      }),
    [],
  )

  /* TODO: Contemplate whether this is necessary or not.
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
      />*/

  return (
    <Head>
      <script {...WEB_SITE_STRUCTURED_DATA} />
      <script {...WEB_PAGE_STRUCTURED_DATA} />
      <script {...ORGANIZATION_STRUCTURED_DATA} />
    </Head>
  )
}
