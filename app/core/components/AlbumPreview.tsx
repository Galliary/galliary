import { Album } from "@prisma/client"
import { Routes } from "blitz"
import { CDN } from "app/core/utils/cdn"
import { Link } from "app/core/components/Link"
import { Box, Center, Image as Img } from "@chakra-ui/react"
import { MotionBox, transitionConfig, transitionMediumConfig } from "app/core/components/MotionBox"
import { useThumbnailSizing } from "app/core/hooks/useThumbnailSizing"
import { Tooltip } from "app/core/components/Tooltip"
import { useHasImageLoaded } from "app/core/hooks/useHasImageLoaded"
import { useRef } from "react"
import { LoadingIconGroup } from "app/core/components/LoadingIconGroup"
import favouriteAlbum from "app/mutations/favouriteAlbum"
import { Favourite } from "app/core/components/Favourite"

export interface EntityPreviewProps {
  item: Album & {
    images: Array<{ id: string; sourceId: string; createdAt: Date }>
  } & {
    userFavourites: Array<{ id: string }>
  }
}

export const AlbumPreview = ({ item: album }: EntityPreviewProps) => {
  const [size, sizingName] = useThumbnailSizing()
  const ref = useRef<HTMLImageElement>(null)
  const hasImageLoaded = useHasImageLoaded(ref)

  const sampleImages = [
    {
      offset: "-68px",
      inset: 5,
    },
    {
      offset: "-44px",
      inset: 3,
    },
    {
      offset: "-20px",
      inset: 1,
    },
  ]

  return (
    <Tooltip label={album.title ?? "Untitled Album"} offset={16}>
      {({ isHovering }) => (
        <Box pos="relative" boxSize={size} zIndex={isHovering ? 10 : 0}>
          {album.images
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .map((image, index) => {
              const offset = sampleImages[index]?.offset ?? ""
              return (
                <Link
                  key={offset}
                  d="flex"
                  rounded="md"
                  href={Routes.ShowImagePage({ albumId: album.id, imageId: image.id ?? "" })}
                >
                  <MotionBox
                    whileHover={{ y: `calc(${isHovering ? offset : 0} - 12px)` }}
                    transition={transitionConfig}
                    animate={{
                      opacity: Number(isHovering),
                      y: isHovering ? offset : 0,
                    }}
                    d={isHovering ? "auto" : "none"}
                    inset={1}
                    rounded="md"
                    pos="absolute"
                    bg="background.dark"
                    borderColor="background.dark"
                    overflow="hidden"
                    bgImg={CDN.getImageUrl(image.sourceId ?? "")}
                    borderWidth={4}
                    bgPosition="center"
                    bgSize="cover"
                    bgRepeat="no-repeat"
                  />
                </Link>
              )
            })}

          <MotionBox
            pos="absolute"
            inset={0}
            boxSize={size}
            rounded="md"
            animate={{
              y: isHovering ? "8px" : 0,
            }}
            transition={transitionMediumConfig}
            overflow="hidden"
            bg="background.full"
          >
            <Box pos="absolute" zIndex={10} top={0} left={0} p={2}>
              <Favourite item={album} mutation={favouriteAlbum} />
            </Box>
            <MotionBox
              pointerEvents="none"
              userSelect="none"
              transition={transitionConfig}
              animate={{ opacity: Number(!hasImageLoaded) }}
            >
              <Center zIndex={1} boxSize="full" inset={0} pos="absolute">
                <LoadingIconGroup size="60%" isSimple />
              </Center>
            </MotionBox>
            <Box
              pos="absolute"
              inset={0}
              filter="blur(60px)"
              rounded="md"
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
              <Link
                key={album.id}
                d="flex"
                rounded="md"
                href={Routes.ShowAlbumPage({ albumId: album.id })}
              >
                <Img
                  ref={ref}
                  rounded="md"
                  overflow="hidden"
                  objectFit="cover"
                  boxSize={size}
                  alt={album.title ?? album.id}
                  src={CDN.getImageUrl(album.sourceId ?? "", sizingName)}
                />
              </Link>
            </MotionBox>
          </MotionBox>
        </Box>
      )}
    </Tooltip>
  )
}
