import { Suspense } from "react"
import { BlitzLayout, Head } from "blitz"
import { Spinner, VStack } from "@chakra-ui/react"
import { VersionDisplay } from "app/core/components/VersionDisplay"
import { Header } from "app/core/layouts/Header"
import { Footer } from "app/core/layouts/Footer"
import { Body } from "app/core/layouts/Body"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "galliary"}</title>
        <link rel="icon" href="/favicon.ico" />
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
        <Footer />
      </VStack>
    </>
  )
}

export default Layout
