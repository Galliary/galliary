import { useQuery } from "blitz"
import getCurrentUser from "app/users/queries/getCurrentUser"

export const useLoggedIn = (): boolean => {
  const [user] = useQuery(getCurrentUser, null)
  return Boolean(user)
}
