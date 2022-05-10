import { PropsForModal } from 'global'
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

export type ConfirmationModalProps = PropsForModal<{
  onConfirm: () => void
  onCancel: () => void
  title: string
  message: string
  cancelMessage: string
  confirmMessage: string
}>

const ConfirmationModal = ({
  onConfirm,
  onCancel,
  title,
  message,
  cancelMessage,
  confirmMessage,
  ...disclosure
}: ConfirmationModalProps) => (
  <Modal {...disclosure}>
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalHeader>
        <Text>{title}</Text>
      </ModalHeader>
      <ModalBody>
        <Text>{message}</Text>
      </ModalBody>
      <ModalFooter>
        <HStack spacing={4} w="full" justify="space-between">
          <Button variant="bad" onClick={onConfirm}>
            {confirmMessage}
          </Button>
          <Button
            onClick={() => {
              disclosure.onClose()
              onCancel()
            }}
          >
            {cancelMessage}
          </Button>
        </HStack>
      </ModalFooter>
    </ModalContent>
  </Modal>
)

export default ConfirmationModal
