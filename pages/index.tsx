import Layout from "app/layouts/Layout";
import { ImageMeta } from "app/meta/ImageMeta";
import { SimpleMeta } from "app/meta/SimpleMeta";
import { OrganizationInfo } from "app/meta/OrganizationInfo";
import { SiteDetails } from "app/constants";
import { Center } from "@chakra-ui/react";
import { NextPage } from "next";
import { useGetAlbumsQuery } from "generated/graphql";
import { getGlobalServerSideProps } from "app/utils/getGlobalServerSideProps";

export interface HomePageProps {
}

export const getServerSideProps = getGlobalServerSideProps(async context => ({ props: {} }))

const AlbumsQuery = () => {
  const { data } = useGetAlbumsQuery()

  return (
    <Center boxSize="full">
      {data?.albums.map((album) => (
        <div key={album.id}>
          {JSON.stringify(album, null, 2)}
        </div>
      ))}
    </Center>
  )
}

const Home: NextPage<HomePageProps> = () => {
  return (
    <Layout>
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
