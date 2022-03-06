import { useRouter, BlitzPage, Routes } from 'blitz'
import Layout from 'app/layouts/Layout'
import SignupForm from 'app/components/forms/SignupForm'

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return <SignupForm onSuccess={() => router.push(Routes.Home())} />
}

SignupPage.redirectAuthenticatedTo = '/'
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
