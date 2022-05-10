import { theme } from 'app/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { ModalController } from 'app/controllers/ModalController'
import { AppProps } from 'next/app'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { createContext, useState } from 'react'
import { GlobalPageProps } from 'global'
import { API_URL } from 'app/constants'

type AppContextType = {
  setAuthToken: (newToken: string) => void
}

export const AppContext = createContext<GlobalPageProps & AppContextType>({
  authToken: null,
  currentUser: null,
  setAuthToken: () => {},
})

function App({ Component, pageProps }: AppProps<GlobalPageProps>) {
  const [authToken, setAuthToken] = useState(pageProps.authToken)

  const cache = new InMemoryCache()

  const client = new ApolloClient({
    uri: `${API_URL}/graphql`,
    cache,
    headers: authToken
      ? {
          Authorization: `Bearer ${authToken}`,
        }
      : {},
  })

  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <ModalController>
          <AppContext.Provider
            value={{ ...pageProps, authToken, setAuthToken }}
          >
            <Component {...pageProps} />
          </AppContext.Provider>
        </ModalController>
      </ApolloProvider>
    </ChakraProvider>
  )
}

export default App
