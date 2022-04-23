import { PropsForModal } from 'types'
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import { UserEditForm } from 'app/components/forms/UserEditForm'
import { useCurrentUser } from 'app/data/hooks/useCurrentUser'
import getCurrentUser from 'app/data/queries/users/getCurrentUser'

export type EditProfileModalProps = PropsForModal<{}>

const EditProfileModal = ({ ...disclosure }: EditProfileModalProps) => {
  const onDone = () => {
    disclosure.onClose()
  }

  const onCancel = () => {
    disclosure.onClose()
  }

  return (
    <Modal {...disclosure}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <Text>Edit your profile</Text>
        </ModalHeader>
        <ModalBody>
          <UserEditForm></UserEditForm>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default EditProfileModal
