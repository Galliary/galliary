import { Box } from "@chakra-ui/react"

interface BannerProps {
  bannerUrl?: string
}

export const Banner = ({ bannerUrl }: BannerProps) => {
  return bannerUrl ? (
    <Box w="full" h="banner.height" overflow="hidden" pos="relative">
      <Box
        pos="absolute"
        inset={-8}
        bgImg={bannerUrl}
        bgSize="cover"
        bgPosition="center"
        filter="blur(50px)"
      />
    </Box>
  ) : null
}
