import { Box } from "@chakra-ui/react"
import { Album } from "@prisma/client"

interface BannerProps {
  album: Album
}

export const Banner = ({ album }: BannerProps) => {
  return (
    <Box w="full" h="banner.height" overflow="hidden" pos="relative">
      <Box
        pos="absolute"
        inset={-8}
        bgSize="cover"
        bgPosition="center"
        filter="blur(80px)"
        bg={`rgba(${album.colors[0]}, ${album.colors[1]}, ${album.colors[2]}, 1)`}
      />
    </Box>
  )
}
