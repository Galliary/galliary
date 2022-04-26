import { theme } from "app/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { ModalController } from "app/controllers/ModalController";
import { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createContext, useState } from "react";
import { GlobalPageProps } from "global";

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
    uri: 'http://localhost:8080/graphql',
    cache,
    headers: {
      Authorization: `Bearer ${authToken}`,
    }
  })

  return (
    <ChakraProvider theme={theme}>
      <ModalController>
        <AppContext.Provider value={{ ...pageProps, authToken, setAuthToken }}>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </AppContext.Provider>
      </ModalController>
    </ChakraProvider>
  )
}

export default App
