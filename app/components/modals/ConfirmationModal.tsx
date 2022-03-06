import { PropsForModal } from 'types'
import {
  Button,
  HStack,
  Modal,
  ModalBody,
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
    <ModalOverlay bg="overlay" />
    <ModalContent
      zIndex={100000}
      p={8}
      rounded="md"
      maxW="500px"
      bg="background.full"
      inset={0}
      margin="auto"
    >
      <VStack w="full" align="start" spacing={4}>
        <ModalHeader>
          <Text textStyle="heading.small">{title}</Text>
        </ModalHeader>
        <ModalBody>
          <Text textStyle="paragraph.large" color="ui.60">
            {message}
          </Text>
        </ModalBody>
        <ModalFooter w="full" pt={6}>
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
      </VStack>
    </ModalContent>
  </Modal>
)

export default ConfirmationModal
