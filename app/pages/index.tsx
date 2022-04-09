import {
  BlitzPage,
  dynamic,
  invokeWithMiddleware,
  PromiseReturnType,
  usePaginatedQuery,
} from 'blitz'
import Layout from 'app/layouts/Layout'
import { Box, Text, VStack } from '@chakra-ui/layout'
import { CDN, ImageType, StaticImages } from 'app/utils/cdn'
import { ImageMeta } from 'app/meta/ImageMeta'
import { usePage } from 'app/data/hooks/usePage'
import { SimpleMeta } from 'app/meta/SimpleMeta'
import getAlbums from 'app/data/queries/albums/getAlbums'
import { AddNewItem } from 'app/components/views/AddNewItem'
import { AlbumPreview } from 'app/components/views/AlbumPreview'
import { useThumbnailSizing } from 'app/data/hooks/useThumbnailSizing'
import { GalleryViewController } from 'app/controllers/GalleryViewController'
import { getGlobalServerSideProps } from 'app/utils/getGlobalServerSideProps'
import { OrganizationInfo } from 'app/meta/OrganizationInfo'
import { SiteDetails } from 'app/constants'
import { Center } from '@chakra-ui/react'
import { useMemo } from 'react'

const AutoImageCarousel = dynamic(
  () => import('app/components/views/AutoImageCarousel'),
  {
    ssr: false,
  },
)

const ITEMS_PER_PAGE = 42

export interface HomeProps {
  initialData: PromiseReturnType<typeof getAlbums>
}

export const getServerSideProps = getGlobalServerSideProps(
  async ({ query, req, res }) => {
    const params: Parameters<typeof getAlbums>[0] = {
      orderBy: { id: 'asc' },
      skip: ITEMS_PER_PAGE * Number(query.page ?? 0) || 0,
      take: ITEMS_PER_PAGE,
    }

    const initialData = await invokeWithMiddleware(getAlbums, params, {
      req,
      res,
    })

    return {
      props: {
        initialData,
      },
    }
  },
)

const Home: BlitzPage<HomeProps> = ({ initialData }) => {
  const { page } = usePage()
  const [{ sizeStyle: size }] = useThumbnailSizing()

  const [{ albums, hasMore }] = usePaginatedQuery(
    getAlbums,
    {
      orderBy: { id: 'asc' },
      skip: ITEMS_PER_PAGE * page,
      take: ITEMS_PER_PAGE,
    },
    {
      initialData,
    },
  )

  const filledAlbums = [
    ...albums,
    ...[...Array(ITEMS_PER_PAGE - albums.length)].fill(null),
  ]

  const randomFeaturedAlbums = useMemo(
    () => [...albums].sort(() => 0.5 - Math.random()),
    [],
  )

  return (
    <>
      <SimpleMeta />
      <ImageMeta
        imageWidth="1200"
        imageHeight="630"
        imageType="image/png"
        imageAlt={SiteDetails.Name}
        imageUrl={CDN.getImageUrl(StaticImages.SocialPreview, ImageType.Social)}
      />
      <OrganizationInfo />

      <VStack w="full" spacing={0}>
        <Center
          p={8}
          w="full"
          pos="relative"
          overflow="hidden"
          textAlign="center"
          h={[
            'banner-mobile.height-with-header',
            null,
            'banner.height-with-header',
          ]}
          mt="-header.height"
        >
          <Text
            as="h2"
            fontSize="24px"
            zIndex={10}
            color="ui.100"
            pt="header.height"
          >
            {SiteDetails.Description}
          </Text>
          <AutoImageCarousel items={randomFeaturedAlbums} />
        </Center>
        <GalleryViewController
          title="Featured Albums"
          data={filledAlbums}
          hasMore={hasMore}
          addPrompt={<AddNewItem />}
          onDisplay={(data) =>
            data ? (
              <Box as="li">
                <AlbumPreview item={data} />
              </Box>
            ) : (
              <Box as="li" bg="ui.5" boxSize={size} />
            )
          }
        />
      </VStack>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home
