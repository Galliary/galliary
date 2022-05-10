import { PropsWithChildren } from 'react'
import { IntlProvider, MessageFormatElement } from 'react-intl'
import i18n from 'i18n.json'
import { useRouter } from 'next/router'

const { defaultLocale } = i18n

export const LocaleController = ({
  children,
  messages,
}: PropsWithChildren<{
  messages: Record<string, string> | Record<string, MessageFormatElement[]>
}>) => {
  const router = useRouter()
  return (
    <IntlProvider
      locale={router.locale ?? defaultLocale}
      defaultLocale={defaultLocale}
      messages={messages}
    >
      {children}
    </IntlProvider>
  )
}
