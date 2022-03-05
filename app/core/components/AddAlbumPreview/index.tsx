import { Routes } from "blitz"
import { Link } from "app/core/components/Link"
import { Box, Center, Text, useBoolean } from "@chakra-ui/react"
import { useThumbnailSizing } from "app/core/hooks/useThumbnailSizing"
import { useLittera } from "@assembless/react-littera"
import { translations } from "app/core/components/AddAlbumPreview/translations"
import { CDN, ImageType } from "app/core/utils/cdn"
import { NewGraphicIcon } from "app/core/icons/NewGraphicIcon"
import { MotionBox, transitionConfig } from "app/core/components/MotionBox"

export const AddAlbumPreview = () => {
  const [size] = useThumbnailSizing()
  const translate = useLittera(translations)
  const [isHovering, setHovering] = useBoolean(false)

  return (
    <Box boxSize={size} p={4}>
      <Link
        boxSize="full"
        d="flex"
        rounded="full"
        href={Routes.NewAlbumPage()}
        pos="relative"
        onPointerEnter={setHovering.on}
        onPointerLeave={setHovering.off}
        color="ui.60"
        _hover={{ color: "ui.100" }}
      >
        <MotionBox
          as={NewGraphicIcon}
          pos="absolute"
          inset={0}
          boxSize="full"
          transition={transitionConfig}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: isHovering ? 1 : 0,
            scale: isHovering ? 1.2 : 0.6,
          }}
        />
        <Center boxSize="full">
          <Text textStyle="display.medium">{translate.label}</Text>
        </Center>
      </Link>
    </Box>
  )
}
