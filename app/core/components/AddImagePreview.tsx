import { Routes, useParam } from "blitz"
import { Link } from "app/core/components/Link"
import { Box, Center, Text, useBoolean } from "@chakra-ui/react"
import { useThumbnailSizing } from "app/core/hooks/useThumbnailSizing"
import { MotionBox, transitionConfig } from "app/core/components/MotionBox"
import { NewGraphicIcon } from "app/core/icons/NewGraphicIcon"

export const AddImagePreview = () => {
  const [size] = useThumbnailSizing()
  const albumId = useParam("albumId", "string")
  const [isHovering, setHovering] = useBoolean(false)

  return (
    <Box boxSize={size} p={4}>
      <Link
        boxSize="full"
        d="flex"
        rounded="full"
        href={Routes.NewImagePage({ albumId: albumId ?? "" })}
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
          <Text textStyle="display.medium">New</Text>
        </Center>
      </Link>
    </Box>
  )
}
