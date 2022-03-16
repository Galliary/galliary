import {
  BlitzPage,
  GetServerSideProps,
  GetStaticProps,
  invokeWithMiddleware,
  PromiseReturnType,
  usePaginatedQuery,
} from 'blitz'
import Layout from 'app/layouts/Layout'
import { usePage } from 'app/data/hooks/usePage'
import getAlbums from 'app/data/queries/albums/getAlbums'
import { AddNewItem } from 'app/components/views/AddNewItem'
import { AlbumPreview } from 'app/components/views/AlbumPreview'
import { GalleryViewController } from 'app/controllers/GalleryViewController'
import { getGlobalServerSideProps } from 'app/utils/getGlobalServerSideProps'

const ITEMS_PER_PAGE = 32

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
    <GalleryViewController
      data={albums}
      hasMore={hasMore}
      addPrompt={<AddNewItem />}
      onDisplay={(data) => <AlbumPreview item={data} />}
    />
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home
