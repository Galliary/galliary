import { Box, Text } from '@chakra-ui/layout'
import packageJson from 'package.json'

export const VersionDisplay = () => (
  <Box
    p={2}
    pos="fixed"
    left={0}
    bottom={0}
    pointerEvents="none"
    userSelect="none"
  >
    <Text textStyle="overline" color="ui.40" fontSize="10px">
      VERSION v{packageJson.version}
    </Text>
  </Box>
)
