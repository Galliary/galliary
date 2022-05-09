import { useRouter } from 'next/router'

export const useParam = (name: string) => {
  const router = useRouter()
  return router.query[name] as string
}
