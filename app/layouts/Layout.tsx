import { Body } from 'app/layouts/Body'
import Script from 'next/script'
import { VStack } from '@chakra-ui/layout'
import { Header } from 'app/layouts/Header'
import { Footer } from 'app/layouts/Footer'
import { GlobalMeta } from 'app/meta/GlobalMeta'
import { VersionDisplay } from 'app/components/views/VersionDisplay'
import { FC, PropsWithChildren } from 'react'

export interface LayoutProps {
  hideFooter?: boolean
}

const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  hideFooter = false,
  children,
}) => {
  return (
    <>
      <GlobalMeta />

      <VStack spacing={0} w="full">
        <Header />
        <VStack w="full">
          <Body>{children}</Body>
          {!hideFooter && <Footer />}
        </VStack>
        <VersionDisplay />
      </VStack>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-J19QYFHHPN"
        strategy="afterInteractive"
      />

      <Script id="ga" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-J19QYFHHPN');
        `}
      </Script>
    </>
  )
}

export default Layout
