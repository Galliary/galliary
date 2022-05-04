import Layout from 'app/layouts/Layout'
import { ImageMeta } from 'app/meta/ImageMeta'
import { SimpleMeta } from 'app/meta/SimpleMeta'
import { OrganizationInfo } from 'app/meta/OrganizationInfo'
import { SiteDetails } from 'app/constants'
import { Center, Text, VStack } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useGetAlbumsQuery } from 'generated/graphql'
import { getGlobalServerSideProps } from 'app/utils/getGlobalServerSideProps'

export interface HomePageProps {}

export const getServerSideProps = getGlobalServerSideProps(async (context) => ({
  props: {},
}))

const AlbumsQuery = () => {
  const { data, error } = useGetAlbumsQuery()

  return (
    <Center boxSize="full">
      <VStack>
        <Text fontSize="32px">Stay tuned</Text>
        <Text>There&apos;s much more on the way!</Text>
        <Text maxW="500px" textAlign="center" color="ui.60" fontSize="14px">
          A lot of changes have been made behind the scenes that affect how
          content is displayed, unfortunately only so much can be done at a
          time. So, while we <i>are</i> working on features, there are other
          features that have been affected and disabled for the time being.
          <br />~ Synqat
        </Text>
        {data?.albums.map((album) => (
          <div key={album.id}>{JSON.stringify(album, null, 2)}</div>
        ))}
      </VStack>
    </Center>
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
