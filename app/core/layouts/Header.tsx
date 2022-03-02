import { Routes } from "blitz"
import { Avatar, Box, Button, Center, Heading, HStack } from "@chakra-ui/react"
import { LoginController } from "../contollers/LoginController"
import { Link } from "../components/Link"
import { useCurrentUser } from "../hooks/useCurrentUser"

export interface HeaderProps {}

export const UserLoggedInHeaderButtons = () => {
  const currentUser = useCurrentUser()

  if (!currentUser) {
    return null
  }

  return (
    <>
      <Button as={Link} href={Routes.NewImagePage()}>
        Create
      </Button>
      <Avatar boxSize={12} src={currentUser.avatarUrl ?? ""} />
    </>
  )
}

export const Header = ({}: HeaderProps) => (
  <Center bg="flow.20" w="full" px={4}>
    <HStack justify="space-between" h="header.height" w="full" maxW="header.width">
      <Link href={Routes.Home()} py={3} px={6} ml={-6} rounded="md">
        <Heading as="h1" textStyle="display.small">
          Galliary
        </Heading>
      </Link>
      <HStack spacing={2}>
        <Button>Browse</Button>
        <LoginController
          action={
            <Button as={Link} href={Routes.LoginPage()} variant="primary">
              Login
            </Button>
          }
        >
          <UserLoggedInHeaderButtons />
        </LoginController>
      </HStack>
    </HStack>
  </Center>
)
