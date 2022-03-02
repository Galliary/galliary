import { atom, useAtom } from "jotai"
import { useEffect, useMemo } from "react"
import { useRouter } from "blitz"

export const bannerAtom = atom<string | undefined>(undefined)

export const useBanner = (bannerSrc?: string) => {
  const router = useRouter()
  const initialBannerSrc = useMemo(() => bannerSrc, [bannerSrc])

  const [banner, setBanner] = useAtom(bannerAtom)

  const handleRouteChange = () => {
    if (banner) {
      setBanner(undefined)
    }
  }

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => router.events.off("routeChangeComplete", handleRouteChange)
  }, [])

  useEffect(() => {
    if (initialBannerSrc && banner !== initialBannerSrc) {
      setBanner(initialBannerSrc)
    }
  }, [initialBannerSrc])

  return [banner, setBanner] as const
}
