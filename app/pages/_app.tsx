import {
  AppProps,
  AuthenticationError,
  AuthorizationError,
  ErrorBoundary,
  ErrorComponent,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from 'blitz'
import { theme } from 'app/theme'
import { ChakraProvider } from '@chakra-ui/react'
import LoginForm from 'app/components/forms/LoginForm'
import { ModalController } from 'app/controllers/ModalController'
import { LocaleController } from 'app/controllers/LocaleController'
import Layout from 'app/layouts/Layout'

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <Layout>
        <ErrorComponent
          statusCode={error.statusCode || 400}
          title={error.message || error.name}
        />
      </Layout>
    )
  }
}

function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <ChakraProvider theme={theme}>
      <ModalController>
        <ErrorBoundary
          FallbackComponent={RootErrorFallback}
          onReset={useQueryErrorResetBoundary().reset}
        >
          <LocaleController messages={pageProps.translations}>
            {getLayout(<Component {...pageProps} />)}
          </LocaleController>
        </ErrorBoundary>
      </ModalController>
    </ChakraProvider>
  )
}

export default App
