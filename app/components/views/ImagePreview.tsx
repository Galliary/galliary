import { Image } from '@prisma/client'
import { Routes } from 'blitz'
import { Box, Center, Image as Img } from '@chakra-ui/react'
import { useRef } from 'react'
import { MotionBox, transitionConfig } from 'app/components/Motion'
import favouriteImage from 'app/data/mutations/images/favouriteImage'
import { CDN } from 'app/utils/cdn'
import { useThumbnailSizing } from 'app/data/hooks/useThumbnailSizing'
import { useHasImageLoaded } from 'app/data/hooks/useHasImageLoaded'
import { Favourite } from 'app/components/views/Favourite'
import { Tooltip } from 'app/components/Tooltip'
import { Link } from 'app/components/Link'
import { LogoLoadingAnimation } from 'app/components/views/LogoLoadingAnimation'

export interface EntityPreviewProps {
  item: Image & {
    userFavourites: Array<{ id: string }>
  }
}

export const ImagePreview = ({ item: image }: EntityPreviewProps) => {
  const ref = useRef<HTMLImageElement>(null)
  const [size, sizingName] = useThumbnailSizing()
  const hasImageLoaded = useHasImageLoaded(ref)

  return (
    <Tooltip label={image.title ?? 'Untitled Image'}>
      <Box
        pos="relative"
        boxSize={size}
        bg="flow.20"
        rounded="md"
        overflow="hidden"
      >
        <Box
          pos="absolute"
          inset={0}
          filter="blur(60px)"
          rounded="md"
          overflow="hidden"
          boxSize="full"
          bg={`rgba(${image.colors[0]}, ${image.colors[1]}, ${image.colors[2]}, 0.4)`}
        />
        <MotionBox
          pointerEvents="none"
          userSelect="none"
          transition={transitionConfig}
          animate={{ opacity: Number(!hasImageLoaded) }}
        >
          <Center zIndex={1} boxSize="full" inset={0} pos="absolute">
            <LogoLoadingAnimation size="60%" />
          </Center>
        </MotionBox>
        <MotionBox
          transition={transitionConfig}
          animate={{ opacity: Number(hasImageLoaded) }}
          whileHover={{ opacity: 0.6 }}
          pos="absolute"
          inset={0}
          boxSize={size}
          rounded="md"
        >
          <Box pos="absolute" zIndex={10} top={0} left={0} p={2}>
            <Favourite item={image} mutation={favouriteImage} />
          </Box>
          <Link
            key={image.id}
            d="flex"
            rounded="md"
            href={Routes.ShowImagePage({
              albumId: image.albumId,
              imageId: image.id,
            })}
          >
            <Img
              ref={ref}
              loading="lazy"
              rounded="md"
              overflow="hidden"
              objectFit="cover"
              boxSize={size}
              alt={image.title ?? image.id}
              src={CDN.getImageUrl(image.sourceId ?? '', sizingName)}
            />
          </Link>
        </MotionBox>
      </Box>
    </Tooltip>
  )
}
