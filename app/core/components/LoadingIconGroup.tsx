import { LoadingIcon } from "app/core/icons/LoadingIcon"
import { Box } from "@chakra-ui/react"

export const LoadingIconGroup = ({
  size,
  isSimple = false,
}: {
  size?: string
  isSimple?: boolean
}) => (
  <Box pos="relative" boxSize={size ?? "256px"}>
    {!isSimple && (
      <>
        <LoadingIcon
          transform="scale(1)"
          pos="absolute"
          margin="auto"
          inset={0}
          boxSize="full"
          stroke="brand.primary.100"
        />
        <LoadingIcon
          transform="scale(1.05)"
          pos="absolute"
          margin="auto"
          inset={0}
          boxSize="full"
          stroke="brand.secondary.100"
        />
      </>
    )}
    <LoadingIcon
      transform="scale(1.1)"
      pos="absolute"
      margin="auto"
      inset={0}
      boxSize="full"
      stroke="ui.100"
      fill="ui.20"
    />
  </Box>
)
