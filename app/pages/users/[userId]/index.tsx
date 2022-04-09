import {
  BlitzPage,
  invokeWithMiddleware,
  PromiseReturnType,
  useMutation,
  useParam,
  useQuery,
  useRouter,
} from 'blitz'
import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react'
import { AlbumPreview } from 'app/components/views/AlbumPreview'
import { CDN, ImageType, StaticImages } from 'app/utils/cdn'
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
import logout from 'app/data/mutations/auth/logout'
import { Tooltip } from 'app/components/Tooltip'
import Layout from 'app/layouts/Layout'
import { EditIcon } from 'app/components/icons/EditIcon'
import { useModal } from 'app/data/hooks/useModal'
import { Link } from 'app/components/Link'
import { getConnectionDetails } from 'app/auth/utils/getConnectionDetails'
import { CogIcon } from 'app/components/icons/CogIcon'
import { Suspense } from 'react'
import { Loader } from 'app/components/views/Loader'
import { getGlobalServerSideProps } from 'app/utils/getGlobalServerSideProps'
import { SimpleMeta } from 'app/meta/SimpleMeta'
import { ImageMeta } from 'app/meta/ImageMeta'
import { SiteDetails } from 'app/constants'

export interface UserPageProps {
  initialData: PromiseReturnType<typeof getUserProfile>
}

export const getServerSideProps = getGlobalServerSideProps<UserPageProps>(
  async ({ query, req, res }) => {
    const params: Parameters<typeof getUserProfile>[0] = {
      idOrUsername: query.userId as string,
    }

    const initialData = await invokeWithMiddleware(getUserProfile, params, {
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

const LogoutButton = () => {
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)

  return (
    <IconButton
      aria-label="Logout"
      p={2}
      onClick={() => logoutMutation().then(() => router.reload())}
    >
      <LogoutIcon
        boxSize={8}
        cursor="pointer"
        color="status.bad"
        transitionDuration="fast"
        transitionTimingFunction="ease"
      />
    </IconButton>
  )
}

const UserPage: BlitzPage<UserPageProps> = ({ initialData, currentUser }) => {
  const idOrUsername = useParam('userId', 'string')
  const [user] = useQuery(getUserProfile, { idOrUsername }, { initialData })
  const [openEditProfileModal] = useModal('editProfile')
  const [openManageConnectionsModal] = useModal('manageConnections')

  const isOwnProfile = Boolean(currentUser && currentUser.id === user.id)

  const hasFavourites =
    user.favouriteUsers.length > 0 ||
    user.favouriteAlbums.length > 0 ||
    user.favouriteImages.length > 0

  return (
    <>
      <SimpleMeta
        title={`${SiteDetails.Name} | ${user.nickname ?? user.username}`}
        description={user.bio ?? 'I am a new Galliary user!'}
      />
      <ImageMeta
        imageWidth="1200"
        imageHeight="630"
        imageType="image/png"
        imageAlt={SiteDetails.Name}
        imageUrl={
          user.avatarSourceId
            ? CDN.getImageUrl(user.avatarSourceId, ImageType.Social)
            : user.avatarUrl ??
              CDN.getImageUrl(StaticImages.SocialPreview, ImageType.Social)
        }
      />

      <VStack boxSize="full" spacing={8}>
        <Suspense fallback={<Loader />}>
          <ProfileBanner
            isOwnProfile={isOwnProfile}
            bannerUrl={
              user.bannerSourceId &&
              CDN.getImageUrl(user.bannerSourceId, ImageType.Public)
            }
          />
        </Suspense>
        <HStack
          spacing={0}
          align="start"
          w="profile.width"
          maxW="profile.width"
        >
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
                  <Avatar
                    bg="flow.10"
                    boxSize="256px"
                    src={
                      user.avatarSourceId
                        ? CDN.getImageUrl(user.avatarSourceId, ImageType.Large)
                        : user.avatarUrl ?? ''
                    }
                  />
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
                <VStack align="start" w="full" spacing={1}>
                  {user.connections
                    .filter((connection) => Boolean(connection.handle))
                    .map((connection, index) => {
                      const details = getConnectionDetails(connection.type)

                      return (
                        <Button
                          key={index}
                          as={Link}
                          p={3}
                          w="full"
                          rounded={0}
                          bg="flow.10"
                          target="_blank"
                          _hover={{ bg: 'flow.20' }}
                          href={details.baseUrl + connection.handle}
                        >
                          <HStack w="full" justify="space-between">
                            <HStack spacing={2} color="brand.primary.80">
                              {details.icon}
                              <Text textStyle="label.small">
                                {details.displayName}
                              </Text>
                            </HStack>
                            <Text textStyle="label.small" color="ui.100">
                              <Text as="span" opacity={0.4}>
                                {details.preHandle}
                              </Text>
                              <Text as="span">{connection.handle}</Text>
                              <Text as="span" opacity={0.4}>
                                {details.postHandle}
                              </Text>
                            </Text>
                          </HStack>
                        </Button>
                      )
                    })}
                  {isOwnProfile && (
                    <Button
                      p={3}
                      w="full"
                      rounded={0}
                      onClick={() => openManageConnectionsModal()}
                    >
                      <HStack w="full" justify="space-between">
                        <Text>Manage Connections</Text>
                        <CogIcon />
                      </HStack>
                    </Button>
                  )}
                </VStack>
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
          <VStack w="full" px={8} spacing={12}>
            <VStack rounded="md" w="full" align="start">
              <VStack align="start" w="full" spacing={2}>
                <HStack w="full" justify="space-between">
                  <Text textStyle="heading.large" color="ui.100">
                    {user.nickname ?? user.username}
                  </Text>
                  <HStack>
                    {isOwnProfile ? (
                      <>
                        <Tooltip label="Logout">
                          <Suspense fallback={<Loader />}>
                            <LogoutButton />
                          </Suspense>
                        </Tooltip>
                        <Tooltip label="Edit Profile">
                          <IconButton
                            aria-label="Edit Profile"
                            p={2}
                            onClick={() => openEditProfileModal()}
                          >
                            <EditIcon
                              boxSize={8}
                              cursor="pointer"
                              transitionDuration="fast"
                              transitionTimingFunction="ease"
                            />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : (
                      <Suspense fallback={<Loader />}>
                        <Favourite
                          item={user}
                          mutation={favouriteUser}
                          style={(isActive) => ({
                            stroke: isActive ? 'special.heart' : 'ui.100',
                          })}
                        />
                      </Suspense>
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
            <Box bg="flow.10" rounded="md" minH="200px" w="full" />
            <Box bg="flow.10" rounded="md" minH="200px" w="full" />
            <Box bg="flow.10" rounded="md" minH="200px" w="full" />
            <Box bg="flow.10" rounded="md" minH="200px" w="full" />
            <Box bg="flow.10" rounded="md" minH="200px" w="full" />
            <Box bg="flow.10" rounded="md" minH="200px" w="full" />
            <Box bg="flow.10" rounded="md" minH="200px" w="full" />
            <Box bg="flow.10" rounded="md" minH="200px" w="full" />
          </VStack>
        </HStack>
      </VStack>
    </>
  )
}

UserPage.getLayout = (page) => <Layout>{page}</Layout>

export default UserPage
