import { BlitzPage, useMutation, usePaginatedQuery } from 'blitz'
import { Avatar, Box, Button, HStack, Text, VStack } from '@chakra-ui/react'
import { AlbumPreview } from 'app/components/views/AlbumPreview'
import { usePage } from 'app/data/hooks/usePage'
import { GalleryViewController } from 'app/controllers/GalleryViewController'
import { useCurrentUser } from 'app/data/hooks/useCurrentUser'
import logout from 'app/data/mutations/auth/logout'
import { AddNewItem } from 'app/components/views/AddNewItem'
import Layout from 'app/layouts/Layout'
import getAlbums from 'app/data/queries/albums/getAlbums'

const ITEMS_PER_PAGE = 32

const Home: BlitzPage = () => {
  const { page } = usePage()
  const [{ albums, hasMore }] = usePaginatedQuery(getAlbums, {
    orderBy: { id: 'asc' },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  return (
    <Box h="full">
      <GalleryViewController
        data={albums}
        hasMore={hasMore}
        addPrompt={<AddNewItem />}
        onDisplay={(data) => <AlbumPreview item={data} />}
      />
    </Box>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
