import { Suspense } from 'react'
import { BlitzLayout, Head } from 'blitz'
import { Spinner, VStack } from '@chakra-ui/react'
import { Header } from 'app/layouts/Header'
import { Footer } from 'app/layouts/Footer'
import { Body } from 'app/layouts/Body'
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
      </Head>

      <VStack spacing={0} boxSize="full">
        <Suspense fallback="Fetching version...">
          <VersionDisplay />
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <Header />
        </Suspense>
        <Body>
          <Suspense fallback={<Spinner />}>{children}</Suspense>
        </Body>
        {!hideFooter && (
          <Suspense fallback={<Spinner />}>
            <Footer />
          </Suspense>
        )}
      </VStack>
    </>
  )
}

export default Layout
