import { Routes, useParam } from "blitz"
import { Link } from "app/core/components/Link"
import { Box, Center, Text } from "@chakra-ui/react"
import { useThumbnailSizing } from "app/core/hooks/useThumbnailSizing"

export const AddImagePreview = () => {
  const [size] = useThumbnailSizing()
  const albumId = useParam("albumId", "string")

  return (
    <Link
      d="flex"
      rounded="md"
      href={albumId ? Routes.UploadAlbumImage({ albumId }) : Routes.NewImagePage()}
    >
      <Center
        rounded="md"
        boxSize={size}
        bg="ui.5"
        borderWidth="4px"
        borderStyle="dashed"
        borderColor="ui.10"
        color="ui.60"
        _hover={{ bg: "ui.10", color: "ui.80" }}
        transitionDuration="fast"
      >
        <Text textStyle="heading.small">New Image</Text>
      </Center>
    </Link>
  )
}
