import { Routes } from 'blitz'
import { Button, Spinner } from '@chakra-ui/react'
import { PropsWithChildren, ReactNode, Suspense } from 'react'
import { Link } from '../components/Link'
import { useCurrentUser } from 'app/data/hooks/useCurrentUser'

interface LoginControllerProps {
  fallback?: ReactNode
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
  fallback = <Spinner />,
}: PropsWithChildren<LoginControllerProps>) => {
  const currentUser = useCurrentUser()

  if (!currentUser) {
    return <Suspense fallback={fallback}>{action}</Suspense>
  }

  return <Suspense fallback={fallback}>{children}</Suspense>
}
