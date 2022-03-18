import {
  BlitzPage,
  PromiseReturnType,
  usePaginatedQuery,
  invokeWithMiddleware,
  Head,
} from 'blitz'
import Layout from 'app/layouts/Layout'
import { Box, HStack } from '@chakra-ui/react'
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
import packageJson from 'package.json'
const { galliary } = packageJson

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
  const [size] = useThumbnailSizing()

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

  return (
    <>
      <Head>
        <SimpleMeta title={galliary.name} description={galliary.description} />
        <ImageMeta
          imageWidth="1200"
          imageHeight="630"
          imageType="image/png"
          imageAlt={galliary.name}
          imageUrl={CDN.getImageUrl(
            StaticImages.SocialPreview,
            ImageType.Social,
          )}
        />
      </Head>
      <HStack spacing={8}>
        <GalleryViewController
          data={filledAlbums}
          hasMore={hasMore}
          addPrompt={<AddNewItem />}
          onDisplay={(data) =>
            data ? (
              <AlbumPreview item={data} />
            ) : (
              <Box bg="ui.5" boxSize={size} />
            )
          }
        />
      </HStack>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home
