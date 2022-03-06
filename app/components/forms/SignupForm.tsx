import { Routes, useMutation } from 'blitz'
import { Button, HStack, Text, VStack } from '@chakra-ui/react'
import { Signup } from 'app/auth/validations'
import signup from 'app/data/mutations/auth/signup'
import LabeledTextField from 'app/components/forms/fields/LabeledTextField'
import Form, { FORM_ERROR } from 'app/components/forms/Form'
import { Link } from 'app/components/Link'

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <VStack align="start" spacing={8}>
      <h1>Create an Account</h1>

      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{ username: '', email: '', password: '' }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error: any) {
            if (
              error.code === 'P2002' &&
              error.meta?.target?.includes('email')
            ) {
              // This error comes from Prisma
              return { email: 'This email is already being used' }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField
          name="username"
          label="Username"
          placeholder="Username"
        />
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
        />
      </Form>

      <HStack spacing={2}>
        <Text>Or</Text>
        <Button as={Link} href={Routes.LoginPage()}>
          Login
        </Button>
      </HStack>
    </VStack>
  )
}

export default SignupForm
