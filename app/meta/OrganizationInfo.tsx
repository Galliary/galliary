import { jsonLdScriptProps } from 'react-schemaorg'
import type {
  Organization,
  SoftwareApplication,
  WebPage,
  WebSite,
} from 'schema-dts'
import { galliary } from 'package.json'

export const OrganizationInfo = () => (
  <>
    <script
      {...jsonLdScriptProps<Organization>({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: galliary.name,
        alternateName: galliary.longName,
        url: galliary.url,
        logo: galliary.logo,
        email: galliary.email,
        sameAs: galliary.socials.map((social) => social.url),
      })}
    />

    <script
      {...jsonLdScriptProps<SoftwareApplication>({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: galliary.name,
        alternateName: galliary.longName,
        url: galliary.url,
        description: galliary.description,
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
        headline: galliary.headline,
        description: galliary.description,
        url: galliary.url,
        about: [
          {
            '@type': 'Thing',
            name: galliary.name,
            sameAs: galliary.socials.map((social) => social.url),
          },
        ],
      })}
    />

    <script
      {...jsonLdScriptProps<WebSite>({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': galliary.url + '#web',
        url: galliary.url,
        name: galliary.name,
      })}
    />
  </>
)
