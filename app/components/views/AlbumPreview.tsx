import { Routes } from 'blitz'
import { Box, Center, Image as Img } from '@chakra-ui/react'
import { Suspense, useRef } from 'react'
import favouriteAlbum from 'app/data/mutations/albums/favouriteAlbum'
import { MotionBox, transitionMediumConfig } from 'app/components/Motion'
import { CDN } from 'app/utils/cdn'
import { useThumbnailSizing } from 'app/data/hooks/useThumbnailSizing'
import { useHasImageLoaded } from 'app/data/hooks/useHasImageLoaded'
import { Favourite } from 'app/components/views/Favourite'
import { Tooltip } from 'app/components/Tooltip'
import { Link } from 'app/components/Link'
import { LogoLoadingAnimation } from 'app/components/views/LogoLoadingAnimation'
import { Loader } from 'app/components/views/Loader'
import type { Album } from '@prisma/client'

export interface EntityPreviewProps {
  item: Album & {
    images: Array<{
      id: string
      title: string
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

  const sampleImages = [
    {
      offset: '-74px',
      inset: 5,
    },
    {
      offset: '-50px',
      inset: 3,
    },
    {
      offset: '-26px',
      inset: 1,
    },
  ]

  return (
    <Tooltip label={album.title ?? 'Untitled Album'}>
      {({ isHovering }) => (
        <Box pos="relative" boxSize={size} zIndex={isHovering ? 10 : 0}>
          {album.images
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .map((image, index) => {
              const offset = sampleImages[index]?.offset ?? ''
              return (
                <MotionBox
                  key={offset}
                  pos="absolute"
                  whileHover={{
                    y: `calc(${isHovering ? offset : 0} - 12px)`,
                  }}
                  transition={transitionMediumConfig}
                  animate={{
                    opacity: Number(isHovering),
                    y: isHovering ? offset : 0,
                  }}
                >
                  <Link
                    d="flex"
                    aria-label={image.title ?? 'Untitled Image'}
                    href={Routes.ShowImagePage({
                      albumId: album.id,
                      imageId: image.id ?? '',
                    })}
                  >
                    <MotionBox
                      boxSize={size}
                      d={isHovering ? 'auto' : 'none'}
                      inset={1}
                      bg="background.dark"
                      borderColor="background.dark"
                      overflow="hidden"
                      bgImg={CDN.getImageUrl(image.sourceId ?? '')}
                      borderWidth={4}
                      bgPosition="center"
                      bgSize="cover"
                      bgRepeat="no-repeat"
                    />
                  </Link>
                </MotionBox>
              )
            })}

          <Link
            d="flex"
            boxSize={size}
            aria-label={album.title ?? 'Untitled Album'}
            href={Routes.ShowAlbumPage({ albumId: album.id })}
          >
            <MotionBox
              pos="absolute"
              inset={0}
              boxSize={size}
              transition={transitionMediumConfig}
              overflow="hidden"
              bg="background.full"
            >
              <Box pos="absolute" zIndex={10} top={0} left={0} p={2}>
                <Suspense fallback={<Loader />}>
                  <Favourite item={album} mutation={favouriteAlbum} />
                </Suspense>
              </Box>
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
            </MotionBox>
          </Link>
        </Box>
      )}
    </Tooltip>
  )
}
