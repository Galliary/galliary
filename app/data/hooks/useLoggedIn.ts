import { useQuery } from 'blitz'
import getCurrentUser from 'app/data/queries/users/getCurrentUser'

export const useLoggedIn = (): boolean => {
  const [user] = useQuery(getCurrentUser, null, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
  return Boolean(user)
}
