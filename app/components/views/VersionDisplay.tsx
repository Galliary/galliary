import packageJson from 'package.json'
import { Box, Text } from '@chakra-ui/layout'

export const VersionDisplay = () => (
  <Box p={2} pos="fixed" left={0} bottom={0}>
    <Text
      textStyle="overline"
      cursor="pointer"
      color="ui.20"
      _hover={{ color: 'ui.40' }}
    >
      Version {packageJson.version}
    </Text>
  </Box>
)
