import { Routes } from 'blitz'
import { Button } from '@chakra-ui/react'
import { Link } from 'app/components/Link'
import { PropsWithChildren, ReactNode } from 'react'
import { useCurrentUser } from 'app/data/hooks/useCurrentUser'

interface LoginControllerProps {
  action?: ReactNode
}

const LoginCTA = () => (
  <Button as={Link} variant="primary" href={Routes.LoginPage()}>
    Login
  </Button>
)

export const LoginController = ({
  children,
  action = <LoginCTA />,
}: PropsWithChildren<LoginControllerProps>) => {
  const currentUser = useCurrentUser()

  if (!currentUser) {
    return <>{action}</>
  }

  return <>{children}</>
}
