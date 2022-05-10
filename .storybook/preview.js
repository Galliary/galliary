import { theme } from 'app/theme'
import { Box, ChakraProvider, Flex } from '@chakra-ui/react'
import { ModalController } from 'app/controllers/ModalController'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story, context) => {
    return (
      <ChakraProvider theme={theme}>
        <ModalController>
          <Flex align="start" justify="start">
            <Story {...context} />
          </Flex>
        </ModalController>
      </ChakraProvider>
    )
  },
]
