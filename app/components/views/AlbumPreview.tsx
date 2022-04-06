import { Routes } from 'blitz'
import { Box, Center, Image as Img } from '@chakra-ui/react'
import { Suspense, useMemo, useRef } from 'react'
import favouriteAlbum from 'app/data/mutations/albums/favouriteAlbum'
import { inOut, MotionBox, transitionMediumConfig } from 'app/components/Motion'
import { CDN } from 'app/utils/cdn'
import { useThumbnailSizing } from 'app/data/hooks/useThumbnailSizing'
import { useHasImageLoaded } from 'app/data/hooks/useHasImageLoaded'
import { Favourite } from 'app/components/views/Favourite'
import { Tooltip } from 'app/components/Tooltip'
import { Link } from 'app/components/Link'
import { LogoLoadingAnimation } from 'app/components/views/LogoLoadingAnimation'
import { Loader } from 'app/components/views/Loader'
import type { Album } from '@prisma/client'
import { AnimatePresence } from 'framer-motion'

export interface EntityPreviewProps {
  item: Album & {
    images: Array<{
      id: string
      title: string | null
      sourceId: string
      createdAt: Date
    }>
  } & {
    userFavourites: Array<{ id: string }>
  }
}

export const AlbumPreview = ({ item: album }: EntityPreviewProps) => {
  const [{ sizeStyle: size }, sizingName] = useThumbnailSizing()
  const ref = useRef<HTMLImageElement>(null)
  const hasImageLoaded = useHasImageLoaded(ref)

  return (
    <Tooltip label={album.title ?? 'Untitled Album'}>
      {({ isHovering }) => (
        <Link
          d="flex"
          pos="relative"
          overflow="hidden"
          boxSize={size}
          aria-label={album.title ?? 'Untitled Album'}
          href={Routes.ShowAlbumPage({ albumId: album.id })}
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
                <Favourite item={album} mutation={favouriteAlbum} />
              </Suspense>
            </MotionBox>
          </AnimatePresence>
          <MotionBox
            pointerEvents="none"
            userSelect="none"
            transition={transitionMediumConfig}
            animate={{ opacity: Number(!hasImageLoaded) }}
          >
            <Center zIndex={1} boxSize="full" inset={0} pos="absolute">
              <LogoLoadingAnimation size="60%" />
            </Center>
          </MotionBox>
          <Box
            pos="absolute"
            inset={0}
            filter="blur(60px)"
            overflow="hidden"
            boxSize="full"
            bg={`rgba(${album.colors[0]}, ${album.colors[1]}, ${album.colors[2]}, 0.4)`}
          />
          <MotionBox
            pos="absolute"
            zIndex={1}
            inset={0}
            animate={{ opacity: Number(hasImageLoaded) }}
          >
            <Img
              ref={ref}
              overflow="hidden"
              objectFit="cover"
              boxSize={size}
              alt={album.title ?? album.id}
              src={CDN.getImageUrl(album.sourceId ?? '', sizingName)}
            />
          </MotionBox>
        </Link>
      )}
    </Tooltip>
  )
}
