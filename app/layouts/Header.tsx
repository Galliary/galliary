import dynamic from 'next/dynamic'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import { Center, Heading, HStack, Text } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { Link } from 'app/components/Link'
import { ENABLED_AUTH_STRATEGIES } from 'app/constants'
import { Suspense } from 'react'
import { Loader } from 'app/components/views/Loader'
import type { CurrentUserType } from 'app/controllers/LoginController'
import { useRoutes } from "app/data/hooks/useRoutes";

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
  const routes = useRoutes()

  if (!currentUser) {
    return null
  }

  return (
    <>
      <Button d={['none', null, 'flex']} as={Link} href={routes.toUploadPage()}>
        Create
      </Button>
      <Avatar
        bg="ui.5"
        _hover={{ color: 'ui.100', bg: 'ui.10' }}
        as={Link}
        href={routes.toUserPage(currentUser.id)}
        boxSize={12}
        name={currentUser.username}
        iconLabel={currentUser.username}
        aria-label={`${currentUser.username}'s profile`}
        src={currentUser.avatarUrl ?? ''}
      />
    </>
  )
}

export const Header = ({}: HeaderProps) => {
  const routes = useRoutes()

  return (
    <Center
      as="header"
      zIndex={10}
      backdropFilter="blur(45px)"
      bg="flow.20"
      w="full"
      px={4}
      flexShrink={0}
    >
      <HStack
        justify="space-between"
        h="header.height"
        w="full"
        maxW="header.width"
      >
        <Link href={routes.toHomePage()} py={3} px={6} ml={-6} rounded="md">
          <Heading
            as="h1"
            textStyle={["display.small-mobile", null, "display.small"]}
            color="ui.100"
          >
            Galliary
          </Heading>
        </Link>
        <HStack spacing={4}>
          <Button d={["none", null, "flex"]} as={Link} href={routes.toHomePage()}>
            Browse
          </Button>

          <LoginController
            action={() => (
              <Button as={Link} variant="primary" href={routes.toLoginPage()}>
                Login
              </Button>
            )}
          >
            {(currentUser) => (
              <UserLoggedInHeaderButtons currentUser={currentUser} />
            )}
          </LoginController>
        </HStack>
      </HStack>
    </Center>
  );
}
