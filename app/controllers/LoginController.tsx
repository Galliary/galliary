import { Routes } from 'blitz'
import { ReactNode } from 'react'
import { Button } from '@chakra-ui/button'
import { Link } from 'app/components/Link'
import { useCurrentUser } from 'app/data/hooks/useCurrentUser'

export type CurrentUserType = ReturnType<typeof useCurrentUser>

interface LoginControllerProps {
  action?: (currentUser: CurrentUserType) => ReactNode
  children: (currentUser: CurrentUserType) => ReactNode
}

const LoginCTA = () => (
  <Button as={Link} variant="primary" href={Routes.LoginPage()}>
    Login
  </Button>
)

const LoginController = ({
  children,
  action = () => <LoginCTA />,
}: LoginControllerProps) => {
  const currentUser = useCurrentUser()

  if (!currentUser) {
    return <>{action(currentUser)}</>
  }

  return <>{children(currentUser)}</>
}

export default LoginController
