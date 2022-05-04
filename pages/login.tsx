import Layout from 'app/layouts/Layout'
import { Button, HStack } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useLoginMutation, useRegisterMutation } from 'generated/graphql'
import { getGlobalServerSideProps } from 'app/utils/getGlobalServerSideProps'
import Form from 'app/components/forms/Form'
import { z } from 'zod'
import LabeledTextField from 'app/components/forms/fields/LabeledTextField'
import { useAuthCookie } from 'app/data/hooks/useAuthCookie'
import { useRouter } from 'next/router'
import { useRoutes } from 'app/data/hooks/useRoutes'
import { useEffect } from 'react'

export interface LoginPageProps {}

export const getServerSideProps = getGlobalServerSideProps(async (context) => ({
  props: {},
}))

const LoginForm = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
})

const RegisterForm = z.object({
  emailOrUsername: z.string(),
  password: z.string(),
})

const Login: NextPage<LoginPageProps> = () => {
  const routes = useRoutes()
  const router = useRouter()
  const [authCookie, setAuthCookie] = useAuthCookie()
  const [loginMutation] = useLoginMutation()
  const [registerMutation] = useRegisterMutation()

  useEffect(() => {
    if (authCookie) {
      router.push(routes.toHomePage())
    }
  }, [authCookie])

  return (
    <Layout>
      {authCookie ? (
        JSON.stringify({ authCookie }, null, 2)
      ) : (
        <HStack align="start" spacing={4}>
          <Form
            onSubmit={async (data) => {
              loginMutation({
                variables: {
                  emailOrUsername: data.emailOrUsername,
                  password: data.password,
                },
              })
                .then((res) => {
                  if (res.data) {
                    setAuthCookie(res.data.login.accessToken)
                  }
                })
                .catch(console.error)
            }}
          >
            <LabeledTextField
              name="emailOrUsername"
              label="Email or Username"
              placeholder="contact@galliary.com | synqat"
              autoComplete="username"
            />
            <LabeledTextField
              name="password"
              type="password"
              label="Password"
              placeholder="••••••"
              autoComplete="current-password"
            />
            <Button type="submit" variant="primary">
              Login
            </Button>
          </Form>
          <Form
            onSubmit={async (data) => {
              registerMutation({
                variables: {
                  email: data.email,
                  username: data.username,
                  password: data.password,
                },
              })
                .then(console.log)
                .catch(console.error)
            }}
          >
            <LabeledTextField
              name="email"
              type="email"
              label="Email"
              placeholder="contact@galliary.com"
            />
            <LabeledTextField
              name="username"
              label="Username"
              placeholder="synqat"
              autoComplete="username"
            />
            <LabeledTextField
              name="password"
              type="password"
              label="Password"
              placeholder="••••••"
              autoComplete="current-password"
            />
            <Button type="submit" variant="primary">
              Register
            </Button>
          </Form>
        </HStack>
      )}
    </Layout>
  )
}

export default Login
