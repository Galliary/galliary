import { ENABLED_AUTH_STRATEGIES } from 'app/constants'
import {
  Button,
  HStack,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { Link } from 'app/components/Link'
import { PropsForModal } from 'global'

export type ManageConnectionsModalProps = PropsForModal<{}>

const ManageConnectionsModal = ({
  ...disclosure
}: ManageConnectionsModalProps) => {
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
          <Text>Manage your connections</Text>
        </ModalHeader>
        <ModalBody>
          {ENABLED_AUTH_STRATEGIES.map((strategy) => (
            <HStack
              key={strategy}
              as={Link}
              href={`/api/connect/${strategy.toLowerCase()}`}
            >
              <Text>{strategy}</Text>
            </HStack>
          ))}
        </ModalBody>
        <ModalFooter>
          <HStack spacing={4} w="full" justify="end">
            <Button variant="primary" onClick={onDone}>
              Done
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ManageConnectionsModal
