import { useBreakpointValue, useToken } from '@chakra-ui/react'
import { ImageType } from 'app/utils/cdn'

export const useThumbnailSizing = (doubleSize: boolean = false) => {
  const [base, sm, md, lg] = useToken(
    'sizes',
    doubleSize
      ? ['featured.base', 'featured.sm', 'featured.md', 'featured.lg']
      : ['thumbnail.base', 'thumbnail.sm', 'thumbnail.md', 'thumbnail.lg'],
  )

  const size = useBreakpointValue({
    base,
    sm,
    md,
    lg,
  })

  const sizingName = useBreakpointValue(
    doubleSize
      ? {
          base: ImageType.Medium,
          sm: ImageType.Large,
          md: ImageType.ExtraLarge,
          lg: ImageType.UltraLarge,
        }
      : {
          base: ImageType.Small,
          sm: ImageType.Medium,
          md: ImageType.Large,
          lg: ImageType.ExtraLarge,
        },
  )

  const sizeStyle = {
    base: 'thumbnail.base',
    sm: 'thumbnail.sm',
    md: 'thumbnail.md',
    lg: 'thumbnail.lg',
  }

  return [{ size, sizeStyle }, sizingName] as const
}
