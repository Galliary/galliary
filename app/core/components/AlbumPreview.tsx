import { Album } from "@prisma/client"
import { Routes } from "blitz"
import { CDN } from "app/core/utils/cdn"
import { Link } from "app/core/components/Link"
import { Box, Image as Img } from "@chakra-ui/react"
import { MotionBox, transitionConfig, transitionMediumConfig } from "app/core/components/MotionBox"
import { useThumbnailSizing } from "app/core/hooks/useThumbnailSizing"
import { Tooltip } from "app/core/components/Tooltip"

export interface EntityPreviewProps {
  item: Album & {
    images: Array<{ id: string; sourceId: string; createdAt: Date }>
  }
}

export const AlbumPreview = ({ item: album }: EntityPreviewProps) => {
  const [size, sizingName] = useThumbnailSizing()

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
        <Box pos="relative" boxSize={size}>
          {album.images
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .map((image, index) => {
              const offset = sampleImages[index]?.offset ?? ""
              return (
                <Link
                  key={offset}
                  d="flex"
                  rounded="md"
                  href={Routes.ShowAlbumImagePage({ albumId: album.id, imageId: image.id ?? "" })}
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
          >
            <Link
              key={album.id}
              d="flex"
              rounded="md"
              href={Routes.ShowAlbumPage({ albumId: album.id })}
            >
              <Img
                bg="#0f121c"
                rounded="md"
                overflow="hidden"
                objectFit="cover"
                boxSize={size}
                alt={album.title ?? album.id}
                src={CDN.getImageUrl(album.sourceId ?? "", sizingName)}
              />
            </Link>
          </MotionBox>
        </Box>
      )}
    </Tooltip>
  )
}
