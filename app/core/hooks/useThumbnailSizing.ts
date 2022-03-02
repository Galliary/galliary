import { useBreakpointValue, useToken } from "@chakra-ui/react"
import { ImageType } from "app/core/utils/cdn"

export const useThumbnailSizing = () => {
  const [base, sm, md, lg] = useToken("sizes", [
    "thumbnail.base",
    "thumbnail.sm",
    "thumbnail.md",
    "thumbnail.lg",
  ])

  const size = useBreakpointValue({
    base,
    sm,
    md,
    lg,
  })

  const sizingName = useBreakpointValue({
    base: ImageType.Small,
    sm: ImageType.Medium,
    md: ImageType.Large,
    lg: ImageType.ExtraLarge,
  })

  return [size, sizingName] as const
}
