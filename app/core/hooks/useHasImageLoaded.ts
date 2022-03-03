import { useBoolean } from "@chakra-ui/react"
import { RefObject, useEffect } from "react"

export const useHasImageLoaded = (ref: RefObject<HTMLImageElement>) => {
  const [isLoaded, setLoaded] = useBoolean(false)

  const hasLoaded = () => {
    setLoaded.on()
  }

  // onLoad doesn't reliably fire on the first load, so we use a ref to check for 'complete'
  useEffect(() => {
    console.log(ref.current?.complete)
    if (ref.current) {
      if (ref.current?.complete && !isLoaded) {
        hasLoaded()
      }
    }

    ref.current?.addEventListener("load", hasLoaded)

    return () => {
      ref.current?.removeEventListener("load", hasLoaded)
    }
  }, [ref.current?.complete])

  return isLoaded
}
