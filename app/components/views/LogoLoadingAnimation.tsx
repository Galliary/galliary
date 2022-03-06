import { Box } from '@chakra-ui/react'
import { LoadingIcon } from 'app/components/icons/LoadingIcon'

export interface LogoLoadingAnimationProps {
  size?: string
}

export const LogoLoadingAnimation = ({ size }: LogoLoadingAnimationProps) => (
  <Box pos="relative" boxSize={size ?? '256px'}>
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
