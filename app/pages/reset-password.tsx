import { BlitzPage, Link, Routes, useMutation, useRouterQuery } from 'blitz'
import { ResetPassword } from 'app/auth/validations'
import Layout from 'app/layouts/Layout'
import Form, { FORM_ERROR } from 'app/components/forms/Form'
import LabeledTextField from 'app/components/forms/fields/LabeledTextField'
import resetPassword from 'app/data/mutations/auth/resetPassword'

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  return (
    <>
      <h1>Set a New Password</h1>

      {isSuccess ? (
        <div>
          <h2>Password Reset Successfully</h2>
          <p>
            Go to the <Link href={Routes.Home()}>homepage</Link>
          </p>
        </div>
      ) : (
        <Form
          submitText="Reset Password"
          schema={ResetPassword}
          initialValues={{
            password: '',
            passwordConfirmation: '',
            token: query.token as string,
          }}
          onSubmit={async (values) => {
            try {
              await resetPasswordMutation(values)
            } catch (error: any) {
              if (error.name === 'ResetPasswordError') {
                return {
                  [FORM_ERROR]: error.message,
                }
              } else {
                return {
                  [FORM_ERROR]:
                    'Sorry, we had an unexpected error. Please try again.',
                }
              }
            }
          }}
        >
          <LabeledTextField
            name="password"
            label="New Password"
            type="password"
          />
          <LabeledTextField
            name="passwordConfirmation"
            label="Confirm New Password"
            type="password"
          />
        </Form>
      )}
    </>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = '/'
ResetPasswordPage.getLayout = (page) => (
  <Layout title="Reset Your Password">{page}</Layout>
)

export default ResetPasswordPage
