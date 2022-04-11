import { ReactNode } from 'react'
import { useCurrentUser } from 'app/data/hooks/useCurrentUser'

export type CurrentUserType = ReturnType<typeof useCurrentUser>

interface LoginControllerProps {
  action?: (currentUser: CurrentUserType) => ReactNode
  children: (currentUser: CurrentUserType) => ReactNode
}

const LoginController = ({
  children,
  action = () => null,
}: LoginControllerProps) => {
  const currentUser = useCurrentUser()

  if (!currentUser) {
    return <>{action(currentUser)}</>
  }

  return <>{children(currentUser)}</>
}

export default LoginController
