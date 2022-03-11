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
import { useMutation } from 'blitz'
import { usePage } from 'app/data/hooks/usePage'
import deleteAlbum from 'app/data/mutations/albums/deleteAlbum'

export const DeleteAlbumModal = ({
  albumId,
  disclosure,
}: {
  albumId: string
  disclosure: UseDisclosureReturn
}) => {
  const { goBack } = usePage()
  const [deleteAlbumMutation] = useMutation(deleteAlbum)

  return (
    <Modal {...disclosure}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <Text>what are u gonna do? delet this album cuh?</Text>
        </ModalHeader>
        <ModalBody>
          <Text>do it, you wont.</Text>
        </ModalBody>
        <ModalFooter>
          <HStack spacing={4} w="full" justify="space-between">
            <Button
              variant="bad"
              onClick={() => deleteAlbumMutation({ id: albumId }).then(goBack)}
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
