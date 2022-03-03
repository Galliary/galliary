import { Image } from "@prisma/client"
import { Routes, useParam } from "blitz"
import { CDN, ImageType } from "app/core/utils/cdn"
import { Link } from "app/core/components/Link"
import { Box, Center, Image as Img } from "@chakra-ui/react"
import { Tooltip } from "app/core/components/Tooltip"
import { useThumbnailSizing } from "app/core/hooks/useThumbnailSizing"
import { LoadingIconGroup } from "app/core/components/LoadingIconGroup"
import { MotionBox, transitionConfig } from "app/core/components/MotionBox"
import { useRef } from "react"
import { useHasImageLoaded } from "app/core/hooks/useHasImageLoaded"

export interface EntityPreviewProps {
  item: Image
}

export const ImagePreview = ({ item: image }: EntityPreviewProps) => {
  const ref = useRef<HTMLImageElement>(null)
  const [size, sizingName] = useThumbnailSizing()
  const albumId = useParam("albumId", "string")
  const hasImageLoaded = useHasImageLoaded(ref)

  return (
    <Tooltip label={image.title ?? "Untitled Image"}>
      <Box pos="relative" boxSize={size} bg="flow.20" rounded="md" overflow="hidden">
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
            <LoadingIconGroup size="60%" isSimple />
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
          <Link
            key={image.id}
            d="flex"
            rounded="md"
            href={
              albumId
                ? Routes.ShowAlbumImagePage({ albumId, imageId: image.id })
                : Routes.ShowImagePage({ imageId: image.id })
            }
          >
            <Img
              ref={ref}
              loading="lazy"
              rounded="md"
              overflow="hidden"
              objectFit="cover"
              boxSize={size}
              alt={image.title ?? image.id}
              src={CDN.getImageUrl(image.sourceId ?? "", sizingName)}
            />
          </Link>
        </MotionBox>
      </Box>
    </Tooltip>
  )
}
