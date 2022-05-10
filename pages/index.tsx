import Layout from 'app/layouts/Layout'
import { ImageMeta } from 'app/meta/ImageMeta'
import { SimpleMeta } from 'app/meta/SimpleMeta'
import { OrganizationInfo } from 'app/meta/OrganizationInfo'
import { SiteDetails } from 'app/constants'
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { useGetFrontPageImagesQuery } from 'generated/graphql.client'
import { getGlobalServerSideProps } from 'app/utils/getGlobalServerSideProps'
import { FeedBox } from 'app/components/views/FeedBox'
import { Link } from 'app/components/Link'
import { useRoutes } from 'app/data/hooks/useRoutes'

export interface HomePageProps {}

export const getServerSideProps = getGlobalServerSideProps(async (context) => ({
  props: {},
}))

const AlbumsQuery = () => {
  const Routes = useRoutes()
  const { data, error } = useGetFrontPageImagesQuery()

  return (
    <VStack w="full" spacing={0} pb={[6, null, 8]}>
      <Box
        w="full"
        pos="sticky"
        bg="background.80"
        backdropFilter="blur(32px)"
        py={[6, null, 8]}
        top={0}
        zIndex={2}
      >
        <Center w="full" px={4}>
          <Box w="full" maxW="feed.width">
            <Text
              textStyle={['label.large', null, 'heading.small']}
              color="ui.80"
            >
              Latest Uploads
            </Text>
          </Box>
        </Center>
      </Box>
      <VStack w="full" spacing={[4, null, 8]} justify="start">
        <HStack align="start" w="full" maxW="feed.width" spacing={8}>
          <VStack spacing={[4, null, 8]} w="full">
            {data?.images.map((image) => (
              <FeedBox key={image.id} image={image} />
            ))}
            <Text>coming soon...</Text>
          </VStack>
          <Flex
            display={['none', null, 'flex']}
            flexShrink={0}
            h="200px"
            w="full"
            maxW="feed.aside"
            pos="sticky"
            top={32}
          >
            <VStack align="start" spacing={4}>
              <Button as={Link} href={Routes.toUploadPage()}>
                Upload
              </Button>
              <VStack align="start" spacing={0}>
                <HStack p={2} spacing={2} textStyle="label.small">
                  <Link href="/about" color="ui.40">
                    <Text>About</Text>
                  </Link>
                  <Text color="ui.20">•</Text>
                  <Link href="/privacy" color="ui.40">
                    <Text>Privacy</Text>
                  </Link>
                  <Text color="ui.20">•</Text>
                  <Link href="/terms" color="ui.40">
                    <Text>Terms</Text>
                  </Link>
                </HStack>
                <Text p={2} color="ui.40" textStyle="paragraph.small">
                  Ⓒ Copyright 2022 • GALLIARY.COM
                </Text>
              </VStack>
            </VStack>
          </Flex>
        </HStack>
      </VStack>
    </VStack>
  )
}

const Home: NextPage<HomePageProps> = () => {
  return (
    <Layout hideFooter>
      <SimpleMeta />
      <ImageMeta
        imageWidth="1200"
        imageHeight="630"
        imageType="image/png"
        imageAlt={SiteDetails.Name}
        imageUrl="CHANGE ME"
      />
      <OrganizationInfo />

      <AlbumsQuery />
    </Layout>
  )
}

export default Home
