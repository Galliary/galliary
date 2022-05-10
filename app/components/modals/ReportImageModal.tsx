import {
  Box,
  Button,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useBoolean,
  VStack,
} from '@chakra-ui/react'
import { Maybe, PropsForModal } from 'global'
import { getImageUrlFromItem } from 'app/services/cdn.service'
import { useState } from 'react'
import { useReportImageMutation } from 'generated/graphql.client'

export type ReportImageModalProps = PropsForModal<{
  image: {
    id: string
    authorId: string
    albumId: string
    title?: Maybe<string>
    imageExt: string
  }
}>

const ReportImageModal = ({ image, ...disclosure }: ReportImageModalProps) => {
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useBoolean(false)
  const [reportImage, reportingState] = useReportImageMutation()

  const onClose = () => {
    disclosure.onClose()
    setReason('')
    setError('')
    setIsLoading.off()
    reportingState.reset()
  }

  const onDone = () => {
    setIsLoading.on()
    reportImage({
      variables: {
        imageId: image.id,
        reason,
      },
    })
      .then(onClose)
      .catch((err) => {
        console.error(err)
        setError('Something went wrong')
        setIsLoading.off()
      })
  }

  return (
    <Modal {...disclosure}>
      <ModalOverlay />
      <ModalContent p={0}>
        <ModalCloseButton />
        <ModalHeader>
          <Text>Report {image.title ?? 'Untitled Image'}</Text>
        </ModalHeader>
        <Box h="160px" bg="flow.10" p={4} w="full">
          <Image
            boxSize="full"
            objectFit="cover"
            src={getImageUrlFromItem(image)}
          />
        </Box>
        <ModalBody>
          <VStack w="full" align="start" spacing={4}>
            <Text textStyle="label.large">
              Why are you reporting this image?
            </Text>
            <Textarea
              p={4}
              placeholder="I am reporting this image because..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></Textarea>
            {error && <Text color="status.bad">{error}</Text>}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack spacing={4} w="full" justify="space-between">
            <Button onClick={onClose}>Cancel</Button>
            <Button
              variant="bad"
              onClick={onDone}
              isLoading={isLoading || reportingState.loading}
            >
              Report
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ReportImageModal
