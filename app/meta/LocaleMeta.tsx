import i18n from 'i18n.json'
import { Head } from 'blitz'
const { defaultLocale, locales } = i18n

export interface LocaleMetaProps {}

const LOCALE_META = locales.map((locale) => (
  <meta
    key={locale}
    property={defaultLocale === locale ? 'og:locale' : 'og:locale:alternate'}
    content={locale}
  />
))

export const LocaleMeta = ({}: LocaleMetaProps) => <Head>{LOCALE_META}</Head>
