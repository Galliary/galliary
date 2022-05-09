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
  UseDisclosureReturn,
} from '@chakra-ui/react'
import { usePage } from 'app/data/hooks/usePage'
import { useDeleteImageMutation } from 'generated/graphql.client'

export const DeleteImageModal = ({
  imageId,
  disclosure,
}: {
  imageId: string
  disclosure: UseDisclosureReturn
}) => {
  const { goBack } = usePage()
  const [deleteImageMutation] = useDeleteImageMutation({
    variables: {
      imageId,
    },
  })

  return (
    <Modal {...disclosure}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <Text>what are u gonna do? delet this image cuh?</Text>
        </ModalHeader>
        <ModalBody>
          <Text>do it, you wont.</Text>
        </ModalBody>
        <ModalFooter>
          <HStack spacing={4} w="full" justify="space-between">
            <Button
              variant="bad"
              onClick={() => deleteImageMutation().then(goBack)}
            >
              watch me cuh
            </Button>
            <Button onClick={disclosure.onClose}>nah</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
