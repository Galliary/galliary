import { BlitzPage, useRouter } from 'blitz'
import Layout from 'app/layouts/Layout'
import LoginForm from 'app/components/forms/LoginForm'

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <LoginForm
        onSuccess={(_user) => {
          const next = router.query.next
            ? decodeURIComponent(router.query.next as string)
            : '/'
          router.push(next)
        }}
      />
    </div>
  )
}

LoginPage.redirectAuthenticatedTo = '/'
LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
