import { Routes } from 'blitz'
import { Button } from '@chakra-ui/react'
import { PropsWithChildren, ReactNode, Suspense } from 'react'
import { Link } from 'app/components/Link'
import { useCurrentUser } from 'app/data/hooks/useCurrentUser'
import { Loader } from 'app/components/views/Loader'

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
  fallback = <Loader />,
}: PropsWithChildren<LoginControllerProps>) => {
  const currentUser = useCurrentUser()

  if (!currentUser) {
    return <Suspense fallback={fallback}>{action}</Suspense>
  }

  return <Suspense fallback={fallback}>{children}</Suspense>
}
