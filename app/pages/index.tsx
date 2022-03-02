import { BlitzPage, useMutation, usePaginatedQuery, useRouter } from "blitz"
import { Avatar, Box, Button, HStack, Text, VStack, Wrap } from "@chakra-ui/react"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { Link } from "app/core/components/Link"
import { LoginController } from "app/core/contollers/LoginController"
import { AlbumPreview } from "app/core/components/AlbumPreview"
import getAlbums from "app/albums/queries/getAlbums"
import { AddAlbumPreview } from "app/core/components/AddAlbumPreview"
import { GalleryViewController } from "app/core/contollers/GalleryViewController"
import { usePage } from "app/core/hooks/usePage"

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
        <Avatar boxSize={16} src={currentUser.avatarUrl ?? ""} />
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
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  return (
    <Box h="full">
      <GalleryViewController
        data={albums}
        hasMore={hasMore}
        addPrompt={<AddAlbumPreview />}
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
