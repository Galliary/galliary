import { Image } from "@prisma/client"
import { Routes, useParam } from "blitz"
import { CDN, ImageType } from "app/core/utils/cdn"
import { Link } from "app/core/components/Link"
import { Box, Center, Image as Img, useBoolean } from "@chakra-ui/react"
import { Tooltip } from "app/core/components/Tooltip"
import { useThumbnailSizing } from "app/core/hooks/useThumbnailSizing"
import { LoadingIconGroup } from "app/core/components/LoadingIconGroup"
import { MotionBox, transitionConfig } from "app/core/components/MotionBox"

export interface EntityPreviewProps {
  item: Image
}

export const ImagePreview = ({ item: image }: EntityPreviewProps) => {
  const [size, sizingName] = useThumbnailSizing()
  const albumId = useParam("albumId", "string")
  const [isLoaded, setLoaded] = useBoolean(false)

  return (
    <Tooltip label={image.title ?? "Untitled Image"}>
      <Box pos="relative" boxSize={size} bg="flow.20" rounded="md" overflow="hidden">
        <Img
          pos="absolute"
          inset={0}
          transition="scale(1.4)"
          filter="blur(60px)"
          rounded="md"
          overflow="hidden"
          objectFit="cover"
          boxSize="full"
          opacity={0.4}
          alt={image.title ?? image.id}
          src={CDN.getImageUrl(image.sourceId ?? "", sizingName)}
        />
        <MotionBox
          pointerEvents="none"
          userSelect="none"
          transition={transitionConfig}
          animate={{ opacity: Number(!isLoaded) }}
        >
          <Center zIndex={1} boxSize="full" inset={0} pos="absolute">
            <LoadingIconGroup size="60%" isSimple />
          </Center>
        </MotionBox>
        <MotionBox
          transition={transitionConfig}
          animate={{ opacity: Number(isLoaded) }}
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
              loading="lazy"
              rounded="md"
              overflow="hidden"
              objectFit="cover"
              boxSize={size}
              onLoad={setLoaded.on}
              alt={image.title ?? image.id}
              src={CDN.getImageUrl(image.sourceId ?? "", sizingName)}
            />
          </Link>
        </MotionBox>
      </Box>
    </Tooltip>
  )
}
