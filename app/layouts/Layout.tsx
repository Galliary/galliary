import { Body } from 'app/layouts/Body'
import { BlitzLayout, Head } from 'blitz'
import { VStack } from '@chakra-ui/react'
import { Header } from 'app/layouts/Header'
import { Footer } from 'app/layouts/Footer'
import { GlobalMeta } from 'app/meta/GlobalMeta'
import { SimpleMeta } from 'app/meta/SimpleMeta'
import { VersionDisplay } from 'app/components/views/VersionDisplay'

const Layout: BlitzLayout<{ title?: string; hideFooter?: boolean }> = ({
  title,
  hideFooter = false,
  children,
}) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@400;500;600;700&family=Style+Script&display=swap"
          rel="stylesheet"
        />

        <GlobalMeta />
      </Head>

      <VStack spacing={0} boxSize="full">
        <VersionDisplay />
        <Header />
        <VStack boxSize="full">
          <Body>{children}</Body>
          {!hideFooter && <Footer />}
        </VStack>
      </VStack>
    </>
  )
}

export default Layout
