import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  PromiseReturnType,
  usePaginatedQuery,
} from 'blitz'
import { Box } from '@chakra-ui/react'
import { AlbumPreview } from 'app/components/views/AlbumPreview'
import { usePage } from 'app/data/hooks/usePage'
import { GalleryViewController } from 'app/controllers/GalleryViewController'
import { AddNewItem } from 'app/components/views/AddNewItem'
import Layout from 'app/layouts/Layout'
import getAlbums from 'app/data/queries/albums/getAlbums'
import { GlobalPageMeta } from 'app/meta/GlobalPageMeta'
import packageJson from '../../package.json'

const ITEMS_PER_PAGE = 32

export type GalliarySiteInfo = typeof packageJson['galliary']

export interface HomeProps {
  siteInfo: GalliarySiteInfo
  initialData: PromiseReturnType<typeof getAlbums>
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({
  query,
  req,
  res,
}) => {
  const initialData = await invokeWithMiddleware(
    getAlbums,
    {
      orderBy: { id: 'asc' },
      skip: ITEMS_PER_PAGE * Number(query.page ?? 0) || 0,
      take: ITEMS_PER_PAGE,
    },
    { req, res },
  )

  return {
    props: {
      initialData,
      siteInfo: packageJson.galliary,
    },
  }
}

const Home: BlitzPage<HomeProps> = ({ initialData, siteInfo }) => {
  const { page } = usePage()
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

  return (
    <>
      <GlobalPageMeta
        siteInfo={siteInfo}
        imageUrl={siteInfo.logo}
        imageAlt={siteInfo.name}
        imageWidth="240"
        imageHeight="240"
        imageType="image/png"
      />
      <Box h="full">
        <GalleryViewController
          data={albums}
          hasMore={hasMore}
          addPrompt={<AddNewItem />}
          onDisplay={(data) => <AlbumPreview item={data} />}
        />
      </Box>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
