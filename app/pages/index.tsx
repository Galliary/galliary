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

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (!currentUser) {
    return null
  }

  return (
    <HStack spacing={4}>
      <HStack spacing={4} p={4} rounded="md" bg="ui.5">
        <Avatar boxSize={16} src={currentUser.avatarUrl ?? ''} />
        <VStack spacing={2} align="start">
          <Text fontSize="20px" color="ui.100">
            {currentUser.nickname ?? currentUser.username}
          </Text>
          <Text color="ui.60">{currentUser.email}</Text>
        </VStack>
      </HStack>
      <Button onClick={() => logoutMutation()} variant="bad">
        Logout
      </Button>
    </HStack>
  )
}

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

      {/* TODO: Move me to a menu */}
      {/*<LoginController
        action={
          <HStack>
            <Button as={Link} href="/api/auth/google">
              Google
            </Button>
            <Button as={Link} href="/api/auth/discord">
              Discord
            </Button>
            <Button as={Link} href="/api/auth/twitter">
              Twitter
            </Button>
          </HStack>
        }
      >
        <UserInfo />
      </LoginController>*/}
    </Box>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
