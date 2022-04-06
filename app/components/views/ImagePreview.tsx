import { Image } from '@prisma/client'
import { Routes } from 'blitz'
import { Box, Center, Image as Img } from '@chakra-ui/react'
import { Suspense, useRef } from 'react'
import { MotionBox, transitionConfig } from 'app/components/Motion'
import favouriteImage from 'app/data/mutations/images/favouriteImage'
import { CDN } from 'app/utils/cdn'
import { useThumbnailSizing } from 'app/data/hooks/useThumbnailSizing'
import { useHasImageLoaded } from 'app/data/hooks/useHasImageLoaded'
import { Favourite } from 'app/components/views/Favourite'
import { Tooltip } from 'app/components/Tooltip'
import { Link } from 'app/components/Link'
import { LogoLoadingAnimation } from 'app/components/views/LogoLoadingAnimation'
import { Loader } from 'app/components/views/Loader'
import { AnimatePresence } from 'framer-motion'
import favouriteAlbum from 'app/data/mutations/albums/favouriteAlbum'

export interface EntityPreviewProps {
  item: Image & {
    userFavourites: Array<{ id: string }>
  }
}

export const ImagePreview = ({ item: image }: EntityPreviewProps) => {
  const ref = useRef<HTMLImageElement>(null)
  const hasImageLoaded = useHasImageLoaded(ref)
  const [{ sizeStyle: size }, sizingName] = useThumbnailSizing()

  return (
    <Tooltip label={image.title ?? 'Untitled Image'}>
      {({ isHovering }) => (
        <Link
          d="flex"
          pos="relative"
          aria-label={image.title ?? 'Untitled Image'}
          href={Routes.ShowImagePage({
            albumId: image.albumId,
            imageId: image.id,
          })}
        >
          <AnimatePresence>
            <MotionBox
              pos="absolute"
              zIndex={10}
              top={0}
              left={0}
              p={2}
              initial={{
                scale: 0,
                opacity: 0,
                y: 0,
              }}
              exit={{
                scale: 0,
                opacity: 0,
                y: 0,
              }}
              animate={{
                scale: Number(isHovering),
                opacity: Number(isHovering),
                y: Number(!isHovering) * 16,
              }}
            >
              <Suspense fallback={<Loader />}>
                <Favourite item={image} mutation={favouriteImage} />
              </Suspense>
            </MotionBox>
          </AnimatePresence>
          <Box pos="relative" boxSize={size} bg="flow.20" overflow="hidden">
            <Box
              pos="absolute"
              inset={0}
              filter="blur(60px)"
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
              pos="absolute"
              inset={0}
              boxSize={size}
            >
              <Img
                ref={ref}
                loading="lazy"
                overflow="hidden"
                objectFit="cover"
                boxSize={size}
                alt={image.title ?? image.id}
                src={CDN.getImageUrl(image.sourceId ?? '', sizingName)}
              />
            </MotionBox>
          </Box>
        </Link>
      )}
    </Tooltip>
  )
}
