import { PromiseReturnType, Routes, useMutation } from 'blitz'
import { Button, HStack, Text, VStack } from '@chakra-ui/react'
import { UserEdit } from 'app/auth/validations'
import userEdit from 'app/data/mutations/users/editCurrentUser'
import LabeledTextField from 'app/components/forms/fields/LabeledTextField'
import Form, { FORM_ERROR } from 'app/components/forms/Form'
import { Link } from 'app/components/Link'

type UserEditFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof userEdit>) => void
}

export const UserEditForm = (props: UserEditFormProps) => {
  const [userEditMutation] = useMutation(userEdit)

  return (
    <VStack align="start" spacing={8}>
      <Form
        submitText="Done"
        schema={UserEdit}
        initialValues={{ alias: '', username: '' }}
        onSubmit={async (values) => {
          await userEditMutation(values)
        }}
      >
        <LabeledTextField
          name="username"
          label="Username"
          placeholder="Username"
        />
        <LabeledTextField name="alias" label="Alias" placeholder="Alias" />
      </Form>
    </VStack>
  )
}

export default UserEditForm
