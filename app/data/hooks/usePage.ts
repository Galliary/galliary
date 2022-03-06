import { useRouter } from 'blitz'

export const usePage = () => {
  const router = useRouter()

  const page = Number(router.query.page) || 0

  const prev = () => router.push({ query: { ...router.query, page: page - 1 } })
  const next = () => router.push({ query: { ...router.query, page: page + 1 } })
  const goBack = () => router.back()

  return {
    page,
    prev,
    next,
    goBack,
  } as const
}
