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
        <ModalFooter>
          <HStack spacing={4} w="full" justify="space-between">
            <Button variant="primary" onClick={onDone}>
              Done
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditProfileModal
