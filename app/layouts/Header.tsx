import { Routes } from 'blitz'
import {
  Avatar,
  Button,
  Center,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { Link } from 'app/components/Link'
import { ENABLED_AUTH_STRATEGIES } from 'app/constants'
import { useCurrentUser } from 'app/data/hooks/useCurrentUser'
import { LoginController } from 'app/controllers/LoginController'

export interface HeaderProps {}

export const UserLoggedInHeaderButtons = () => {
  const currentUser = useCurrentUser()

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
        src={currentUser.avatarUrl ?? ''}
      />
    </>
  )
}

export const Header = ({}: HeaderProps) => (
  <Center bg="flow.20" w="full" px={4} flexShrink={0}>
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
        <LoginController
          action={
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
          }
        >
          <UserLoggedInHeaderButtons />
        </LoginController>
      </HStack>
    </HStack>
  </Center>
)
