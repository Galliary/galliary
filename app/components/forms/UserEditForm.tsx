import { PromiseReturnType, Routes, useMutation } from 'blitz'
import { Button, HStack, Text, VStack } from '@chakra-ui/react'
import { UserEdit } from 'app/auth/validations'
import userEdit from 'app/data/mutations/users/editCurrentUser'
import LabeledTextField from 'app/components/forms/fields/LabeledTextField'
import Form, { FORM_ERROR } from 'app/components/forms/Form'
import { Link } from 'app/components/Link'
import { useCurrentUser } from 'app/data/hooks/useCurrentUser'
import { User } from '@prisma/client'

type UserEditFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof userEdit>) => void
  currentUser: User
}

export const UserEditForm = (props: UserEditFormProps) => {
  const [userEditMutation] = useMutation(userEdit)

  const currentUser = useCurrentUser()

  return (
    <VStack align="start" spacing={8}>
      <Form
        submitText="Done"
        schema={UserEdit}
        initialValues={{
          nickname: currentUser!.nickname!,
          username: currentUser!.username,
        }}
        onSubmit={async (values) => {
          await userEditMutation(values)
        }}
      >
        <LabeledTextField
          name="username"
          label="Username"
          placeholder="Username"
        />
        <LabeledTextField
          name="nickname"
          label="Nickname"
          placeholder="Nickname"
        />
      </Form>
    </VStack>
  )
}

export default UserEditForm
