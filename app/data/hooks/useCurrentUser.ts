import { useQuery } from 'blitz'
import getCurrentUser from 'app/data/queries/users/getCurrentUser'

export const useCurrentUser = () => {
  const [user] = useQuery(getCurrentUser, null)

  return user
}
