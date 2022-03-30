import { dynamic, Routes } from 'blitz'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import { Center, Heading, HStack, Text } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { Link } from 'app/components/Link'
import { ENABLED_AUTH_STRATEGIES } from 'app/constants'
import { Suspense } from 'react'
import { Loader } from 'app/components/views/Loader'
import { CDN, ImageType } from 'app/utils/cdn'
import type { CurrentUserType } from 'app/controllers/LoginController'

const LoginController = dynamic(
  () => import('app/controllers/LoginController'),
  {
    ssr: false,
    loading: () => <Loader />,
  },
)

export interface HeaderProps {}

export const UserLoggedInHeaderButtons = ({
  currentUser,
}: {
  currentUser: CurrentUserType
}) => {
  if (!currentUser) {
    return null
  }

  return (
    <>
      <Button as={Link} href={Routes.NewAlbumPage()}>
        Create
      </Button>
      <Avatar
        as={Link}
        href={Routes.UserPage({ userId: currentUser.id })}
        boxSize={12}
        name={currentUser.username}
        iconLabel={currentUser.username}
        aria-label={`${currentUser.username}'s profile`}
        src={
          CDN.getImageUrl(currentUser.avatarSourceId ?? '', ImageType.Large) ??
          currentUser.avatarUrl ??
          ''
        }
      />
    </>
  )
}

export const Header = ({}: HeaderProps) => (
  <Center as="header" bg="flow.20" w="full" px={4} flexShrink={0}>
    <HStack
      justify="space-between"
      h="header.height"
      w="full"
      maxW="header.width"
    >
      <Link href={Routes.Home()} py={3} px={6} ml={-6} rounded="md">
        <Heading as="h1" textStyle="display.small" color="ui.100">
          Galliary
        </Heading>
      </Link>
      <HStack spacing={4}>
        <Button as={Link} href={Routes.Home()}>
          Browse
        </Button>

        <Suspense fallback={<Loader />}>
          <LoginController
            action={() => (
              <Menu>
                <MenuButton as={Button} variant="primary">
                  Login
                </MenuButton>
                <MenuList minW="200px">
                  {ENABLED_AUTH_STRATEGIES.map((strategy) => (
                    <MenuItem
                      key={strategy}
                      as={Link}
                      href={`/api/auth/${strategy.toLowerCase()}`}
                    >
                      <HStack>
                        <Text>{strategy}</Text>
                      </HStack>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            )}
          >
            {(currentUser) => (
              <UserLoggedInHeaderButtons currentUser={currentUser} />
            )}
          </LoginController>
        </Suspense>
      </HStack>
    </HStack>
  </Center>
)
