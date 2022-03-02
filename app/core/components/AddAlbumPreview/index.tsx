import { Routes } from "blitz"
import { Link } from "app/core/components/Link"
import { Box, Center, Text } from "@chakra-ui/react"
import { useThumbnailSizing } from "app/core/hooks/useThumbnailSizing"
import { useLittera } from "@assembless/react-littera"
import { translations } from "app/core/components/AddAlbumPreview/translations"

export const AddAlbumPreview = () => {
  const [size] = useThumbnailSizing()
  const translate = useLittera(translations)

  return (
    <Link d="flex" rounded="md" href={Routes.NewAlbumPage()}>
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
        <Text textStyle="heading.small">{translate.label}</Text>
      </Center>
    </Link>
  )
}
