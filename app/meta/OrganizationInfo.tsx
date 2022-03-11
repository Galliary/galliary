import { jsonLdScriptProps } from 'react-schemaorg'
import type {
  Organization,
  SoftwareApplication,
  WebPage,
  WebSite,
} from 'schema-dts'
import { GalliarySiteInfo } from 'app/pages/_app'

export interface OrganizationInfoProps {
  siteInfo: GalliarySiteInfo
}

export const OrganizationInfo = ({ siteInfo }: OrganizationInfoProps) => (
  <>
    <script
      {...jsonLdScriptProps<Organization>({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteInfo.name,
        alternateName: siteInfo.longName,
        url: siteInfo.url,
        logo: siteInfo.logo,
        email: siteInfo.email,
        sameAs: siteInfo.socials.map((social) => social.url),
      })}
    />

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
    />

    <script
      {...jsonLdScriptProps<WebPage>({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        headline: siteInfo.headline,
        description: siteInfo.description,
        url: siteInfo.url,
        about: [
          {
            '@type': 'Thing',
            name: siteInfo.name,
            sameAs: siteInfo.socials.map((social) => social.url),
          },
        ],
      })}
    />

    <script
      {...jsonLdScriptProps<WebSite>({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': siteInfo.url + '#web',
        url: siteInfo.url,
        name: siteInfo.name,
      })}
    />
  </>
)
