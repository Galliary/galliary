import { Suspense } from 'react'
import { BlitzPage, Head, useMutation, useParam, useQuery } from 'blitz'
import { Avatar, Box, HStack, Text, VStack } from '@chakra-ui/react'
import { AlbumPreview } from 'app/components/views/AlbumPreview'
import { CDN, ImageType } from 'app/utils/cdn'
import getUserProfile from 'app/data/queries/users/getUserProfile'
import { LogoutIcon } from 'app/components/icons/LogoutIcon'
import { ImagePreview } from 'app/components/views/ImagePreview'
import { MotionBox, transitionConfig } from 'app/components/Motion'
import { InvertCircleLongIcon } from 'app/components/icons/InvertCircleLongIcon'
import { FavouritesSection } from 'app/components/views/FavouritesSection'
import { Favourite } from 'app/components/views/Favourite'
import { ProfileBanner } from 'app/components/views/ProfileBanner'
import { HeartIcon } from 'app/components/icons/HeartIcon'
import favouriteUser from 'app/data/mutations/users/favouriteUser'
import { useCurrentUser } from 'app/data/hooks/useCurrentUser'
import logout from 'app/data/mutations/auth/logout'
import { Tooltip } from 'app/components/Tooltip'
import Layout from 'app/layouts/Layout'

export const UserProfile = () => {
  const currentUser = useCurrentUser()
  const userId = useParam('userId', 'string')
  const [user] = useQuery(getUserProfile, { idOrUsername: userId })
  const [logoutMutation] = useMutation(logout)

  const isOwnProfile = Boolean(currentUser && currentUser.id === user.id)

  const hasFavourites =
    user.favouriteUsers.length > 0 ||
    user.favouriteAlbums.length > 0 ||
    user.favouriteImages.length > 0

  return (
    <VStack boxSize="full" spacing={8}>
      <ProfileBanner
        isOwnProfile={isOwnProfile}
        bannerUrl={
          user.bannerSourceId &&
          CDN.getImageUrl(user.bannerSourceId, ImageType.Public)
        }
      />
      <HStack spacing={0} align="start" w="profile.width" maxW="profile.width">
        <Box pos="relative" flexShrink={0} zIndex={10}>
          <VStack spacing={10} align="start" transform="translateY(-156px)">
            <MotionBox
              initial={{ y: 32 }}
              animate={{ y: 0 }}
              transition={transitionConfig}
            >
              <Box p={8} rounded="full" bg="background.full">
                <InvertCircleLongIcon
                  pos="absolute"
                  top="84px"
                  left="-51px"
                  color="background.full"
                  transform="scaleX(-1)"
                />
                <Avatar boxSize="256px" src={user.avatarUrl ?? ''} />
                <InvertCircleLongIcon
                  pos="absolute"
                  top="84px"
                  right="-51px"
                  color="background.full"
                />
              </Box>
            </MotionBox>
            <VStack px={8} w="full" spacing={10} align="start">
              <Text textStyle="paragraph.large" color="ui.60">
                {user.bio ?? 'I am a new Galliary user!'}
              </Text>
              {hasFavourites && (
                <VStack w="full" align="start" spacing={2}>
                  <HStack spacing={2}>
                    <HeartIcon color="special.heart" boxSize={7} />
                    <Text textStyle="heading.small" color="ui.60">
                      Favourites
                    </Text>
                  </HStack>
                  <VStack w="full">
                    <FavouritesSection
                      label="People"
                      items={user.favouriteUsers}
                    />
                    <FavouritesSection
                      label="Albums"
                      items={user.favouriteAlbums}
                    />
                    <FavouritesSection
                      label="Images"
                      items={user.favouriteImages}
                    />
                  </VStack>
                </VStack>
              )}
            </VStack>
          </VStack>
        </Box>
        <VStack px={8} spacing={12}>
          <VStack rounded="md" w="full" align="start">
            <VStack align="start" w="full" spacing={2}>
              <HStack w="full" justify="space-between">
                <Text textStyle="heading.large" color="ui.100">
                  {user.nickname ?? user.username}
                </Text>
                <HStack>
                  {isOwnProfile ? (
                    <Tooltip label="Logout">
                      <LogoutIcon
                        boxSize={10}
                        cursor="pointer"
                        color="status.bad"
                        transitionDuration="fast"
                        transitionTimingFunction="ease"
                        _hover={{ opacity: 0.8 }}
                        onClick={() => logoutMutation()}
                      />
                    </Tooltip>
                  ) : (
                    <Favourite
                      item={user}
                      mutation={favouriteUser}
                      style={(isActive) => ({
                        stroke: isActive ? 'special.heart' : 'ui.100',
                      })}
                    />
                  )}
                </HStack>
              </HStack>
              {user.nickname && (
                <Text textStyle="label.medium" color="ui.40">
                  @{user.username}
                </Text>
              )}
            </VStack>
          </VStack>
          {user.albums.length > 0 && (
            <VStack w="full" align="start">
              <Text textStyle="heading.medium" color="ui.80">
                Latest Albums
              </Text>
              <HStack w="full">
                {user.albums.map((album) => (
                  <AlbumPreview key={album.id} item={album} />
                ))}
              </HStack>
            </VStack>
          )}
          {user.images.length > 0 && (
            <VStack w="full" align="start">
              <Text textStyle="heading.medium" color="ui.80">
                Latest Images
              </Text>
              <HStack w="full">
                {user.images.map((image) => (
                  <ImagePreview key={image.id} item={image} />
                ))}
              </HStack>
            </VStack>
          )}
          <Box bg="flow.20" rounded="md" minH="200px" w="full" />
          <Box bg="flow.20" rounded="md" minH="200px" w="full" />
          <Box bg="flow.20" rounded="md" minH="200px" w="full" />
          <Box bg="flow.20" rounded="md" minH="200px" w="full" />
          <Box bg="flow.20" rounded="md" minH="200px" w="full" />
          <Box bg="flow.20" rounded="md" minH="200px" w="full" />
        </VStack>
      </HStack>
    </VStack>
  )
}

const UserPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>User</title>
      </Head>

      <Suspense fallback={<div>Loading...</div>}>
        <UserProfile />
      </Suspense>
    </>
  )
}

UserPage.getLayout = (page) => <Layout>{page}</Layout>

export default UserPage
