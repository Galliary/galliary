import { useCurrentUser } from 'app/data/hooks/useCurrentUser'

export const useLoggedIn = (): boolean => {
  const user = useCurrentUser()
  return Boolean(user)
}
