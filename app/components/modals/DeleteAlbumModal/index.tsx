import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
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
      <ModalOverlay bg="overlay" zIndex={1} />
      <Box pos="absolute" zIndex={2}>
        <ModalContent
          p={8}
          rounded="md"
          maxW="500px"
          bg="background.full"
          inset={0}
          margin="auto"
          zIndex={2}
        >
          <VStack w="full" align="start" spacing={4}>
            <ModalHeader>
              <Text textStyle="heading.small">{translated.title}</Text>
            </ModalHeader>
            <ModalBody>
              <Text textStyle="paragraph.large" color="ui.60">
                {translated.body_0}
                <br />
                {translated.body_1}
              </Text>
            </ModalBody>
            <ModalFooter w="full" pt={6}>
              <HStack spacing={4} w="full" justify="space-between">
                <Button
                  variant="bad"
                  onClick={() =>
                    deleteAlbumMutation({ id: albumId }).then(goBack)
                  }
                >
                  {translated.confirm}
                </Button>
                <Button onClick={disclosure.onClose}>
                  {translated.cancel}
                </Button>
              </HStack>
            </ModalFooter>
          </VStack>
        </ModalContent>
      </Box>
    </Modal>
  )
}
