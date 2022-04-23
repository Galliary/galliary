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
}

export const UserEditForm = (props: UserEditFormProps) => {
  const [userEditMutation] = useMutation(userEdit)

  const currentUser = useCurrentUser()

  if(!currentUser)
  {
    return (<Text as="span">
      No user logged in, are you supposed to be here in the first place?
    </Text>)
  }

  return (
    <VStack align="start" spacing={8}>
      <Form
        submitText="Done"
        schema={UserEdit}
        initialValues={{
          nickname: currentUser.nickname!,
          username: currentUser.username,
          email: currentUser.email,
          bio: currentUser.bio!
        }}
        onSubmit={async (values) => {
          await userEditMutation(values)
        }}
        style={{width: "100%"}}
        
      >
        <LabeledTextField
          name="username"
          label="Username"
          placeholder="Username"
          p={2}
          width="100%"
        />
        <LabeledTextField
          name="nickname"
          label="Nickname"
          placeholder="Nickname"
          p={2}
          width="100%"
        />
        <LabeledTextField
          name="email"
          label="E-Mail"
          placeholder="E-Mail"
          p={2}
          width="100%"
        />
        <LabeledTextField
          name="bio"
          label="Bio"
          placeholder="Bio"
          p={2}
          width="100%"
        />
      </Form>
    </VStack>
  )
}

export default UserEditForm
