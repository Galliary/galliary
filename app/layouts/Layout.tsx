import { Suspense } from 'react'
import { Body } from 'app/layouts/Body'
import { BlitzLayout, Head } from 'blitz'
import { Header } from 'app/layouts/Header'
import { Footer } from 'app/layouts/Footer'
import { VStack } from '@chakra-ui/react'
import { VersionDisplay } from 'app/components/views/VersionDisplay'
import { Loader } from 'app/components/views/Loader'
import { GlobalMeta } from 'app/meta/GlobalMeta'
import { SimpleMeta } from 'app/meta/SimpleMeta'

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
        <SimpleMeta />
      </Head>

      <VStack spacing={0} boxSize="full">
        <VersionDisplay />
        <Suspense fallback={<Loader />}>
          <Header />
        </Suspense>
        <Body>
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </Body>
        {!hideFooter && (
          <Suspense fallback={<Loader />}>
            <Footer />
          </Suspense>
        )}
      </VStack>
    </>
  )
}

export default Layout
