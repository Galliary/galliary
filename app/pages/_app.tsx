import {
  AppProps,
  AuthenticationError,
  AuthorizationError,
  ErrorBoundary,
  ErrorComponent,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
  useRouter,
} from 'blitz'
import { ChakraProvider } from '@chakra-ui/react'
import { LitteraProvider } from '@assembless/react-littera'
import { theme } from 'app/theme'
import LoginForm from 'app/components/forms/LoginForm'
import { ModalController } from 'app/controllers/ModalController'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <LitteraProvider
      locales={router.locales}
      initialLocale={router.locale ?? router.defaultLocale}
    >
      <ChakraProvider theme={theme}>
        <ModalController>
          <ErrorBoundary
            FallbackComponent={RootErrorFallback}
            onReset={useQueryErrorResetBoundary().reset}
          >
            {getLayout(<Component {...pageProps} />)}
          </ErrorBoundary>
        </ModalController>
      </ChakraProvider>
    </LitteraProvider>
  )
}

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
      <ErrorComponent
        statusCode={error.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}
