import {
  Box,
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
  VStack,
} from '@chakra-ui/react'
import { useMutation } from 'blitz'
import { useLittera } from '@assembless/react-littera'
import { usePage } from 'app/data/hooks/usePage'
import { translations } from 'app/components/modals/DeleteAlbumModal/translations'
import deleteAlbum from 'app/data/mutations/albums/deleteAlbum'

export const DeleteAlbumModal = ({
  albumId,
  disclosure,
}: {
  albumId: string
  disclosure: UseDisclosureReturn
}) => {
  const { goBack } = usePage()
  const translated = useLittera(translations)
  const [deleteAlbumMutation] = useMutation(deleteAlbum)

  return (
    <Modal {...disclosure}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <Text>{translated.title}</Text>
        </ModalHeader>
        <ModalBody>
          <Text>
            {translated.body_0}
            <br />
            {translated.body_1}
          </Text>
        </ModalBody>
        <ModalFooter>
          <HStack spacing={4} w="full" justify="space-between">
            <Button
              variant="bad"
              onClick={() => deleteAlbumMutation({ id: albumId }).then(goBack)}
            >
              {translated.confirm}
            </Button>
            <Button onClick={disclosure.onClose}>{translated.cancel}</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
