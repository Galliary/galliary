import { Body } from 'app/layouts/Body'
import { BlitzLayout, Head } from 'blitz'
import { VStack } from '@chakra-ui/layout'
import { Header } from 'app/layouts/Header'
import { Footer } from 'app/layouts/Footer'
import { GlobalMeta } from 'app/meta/GlobalMeta'
import { VersionDisplay } from 'app/components/views/VersionDisplay'

const Layout: BlitzLayout<{ title?: string; hideFooter?: boolean }> = ({
  title,
  hideFooter = false,
  children,
}) => {
  return (
    <>
      <GlobalMeta />

      <VStack spacing={0} boxSize="full">
        <Header />
        <VStack boxSize="full">
          <Body>{children}</Body>
          {!hideFooter && <Footer />}
        </VStack>
        <VersionDisplay />
      </VStack>
    </>
  )
}

export default Layout
