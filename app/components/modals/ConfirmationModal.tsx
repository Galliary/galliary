import { PropsForModal } from 'types'
import { Button } from '@chakra-ui/button'
import { HStack, Text } from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'

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
