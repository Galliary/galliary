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
  UseDisclosureReturn,
  VStack,
} from '@chakra-ui/react'
import { useMutation } from 'blitz'
import { useLittera } from '@assembless/react-littera'
import deleteImage from 'app/data/mutations/images/deleteImage'
import { usePage } from 'app/data/hooks/usePage'
import { translations } from 'app/components/modals/DeleteImageModal/translations'

export const DeleteImageModal = ({
  imageId,
  disclosure,
}: {
  imageId: string
  disclosure: UseDisclosureReturn
}) => {
  const { goBack } = usePage()
  const translated = useLittera(translations)
  const [deleteImageMutation] = useMutation(deleteImage)

  return (
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
                  deleteImageMutation({ id: imageId }).then(goBack)
                }
              >
                {translated.confirm}
              </Button>
              <Button onClick={disclosure.onClose}>{translated.cancel}</Button>
            </HStack>
          </ModalFooter>
        </VStack>
      </ModalContent>
    </Modal>
  )
}
