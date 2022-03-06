import {
  AuthenticationError,
  useMutation,
  Routes,
  PromiseReturnType,
} from 'blitz'
import { Login } from 'app/auth/validations'
import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react'
import login from 'app/data/mutations/auth/login'
import Form, { FORM_ERROR } from 'app/components/forms/Form'
import LabeledTextField from 'app/components/forms/fields/LabeledTextField'
import { Link } from 'app/components/Link'

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <VStack align="start" spacing={8}>
      <Box w="full">
        <h1>Login</h1>
      </Box>

      <Form
        submitText="Login"
        schema={Login}
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          try {
            const user = await loginMutation(values)
            props.onSuccess?.(user)
          } catch (error: any) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: 'Sorry, those credentials are invalid' }
            } else {
              return {
                [FORM_ERROR]:
                  'Sorry, we had an unexpected error. Please try again. - ' +
                  error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
          autoComplete="current-password"
        />
      </Form>

      <Button as={Link} href={Routes.ForgotPasswordPage()}>
        Forgot your password?
      </Button>

      <HStack spacing={2}>
        <Text>Or</Text>
        <Button as={Link} href={Routes.SignupPage()}>
          Sign Up
        </Button>
      </HStack>
    </VStack>
  )
}

export default LoginForm
