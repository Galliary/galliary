import { useRouter } from 'next/router'
import { useRoutes } from 'app/data/hooks/useRoutes'

export const useLogout = () => {
  const router = useRouter()
  const routes = useRoutes()

  return () => router.push(routes.toLogout())
}
