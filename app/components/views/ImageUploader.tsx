import { useThumbnailSizing } from 'app/data/hooks/useThumbnailSizing'
import {
  Box,
  Button,
  Center,
  chakra,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  useBoolean,
  VStack,
} from '@chakra-ui/react'
import { UploadIcon } from 'app/components/icons/UploadIcon'
import {
  DragEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react'
import { AnimatePresence } from 'framer-motion'
import {
  MotionBox,
  MotionFlex,
  MotionSpinner,
  MotionStack,
  transitionMediumConfig,
} from 'app/components/Motion'
import { Tooltip } from 'app/components/Tooltip'
import { UploadIndicatorIcon } from 'app/components/icons/UploadIndicatorIcon'
import { UploadCompleteIcon } from 'app/components/icons/UploadCompleteIcon'
import { DeleteIcon } from 'app/components/icons/DeleteIcon'
import { EditIcon } from 'app/components/icons/EditIcon'
import {
  ImageUploadStateType,
  useUploadState,
} from 'app/data/hooks/useUploadState'
import {
  useDeleteImageMutation,
  useUpdateImageMutation,
} from 'generated/graphql.client'
import { getDataUriForBlob } from 'app/utils/files'
import { Loader } from 'app/components/views/Loader'
import { getImageUrl } from 'app/services/cdn.service'
import { LogoLoadingAnimation } from 'app/components/views/LogoLoadingAnimation'

export interface ImageUploaderProps {
  onUpload?(files: FileList | null): void
}

const IU_NAME = 'ImageUploadPrompt'
const DONE_PERCENT = 100

const Prompt = ({ children }: PropsWithChildren<unknown>) => (
  <Box pos="relative" boxSize="full">
    <MotionBox
      pos="absolute"
      boxSize="full"
      inset={0}
      exit={{ y: 4 }}
      animate={{ y: 0 }}
      initial={{ y: 4 }}
      transition={transitionMediumConfig}
    >
      {children}
    </MotionBox>
  </Box>
)

const DragUploadPrompt = () => (
  <Prompt>
    <Center zIndex={1} boxSize="full" inset={0} pos="absolute">
      <Text textStyle="label.large">Drop to upload</Text>
    </Center>
  </Prompt>
)

const ImageUploadPrompt = ({ children }: PropsWithChildren<unknown>) => (
  <Prompt>
    <Center zIndex={1} boxSize="full" inset={0} pos="absolute">
      <VStack spacing={[2, null, 6]}>
        <UploadIcon
          className={IU_NAME}
          boxSize={['32px', null, '64px']}
          transitionDuration="fast"
          color="brand.primary.40"
        />
        <Text textStyle="label.medium" color="ui.60">
          Click here or Drag & Drop images
        </Text>
      </VStack>
      {children}
    </Center>
  </Prompt>
)

const ImageThumbnail = ({ src }: { src: string }) => (
  <MotionBox
    pos="absolute"
    inset={0}
    boxSize="full"
    transition={transitionMediumConfig}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
  >
    <Image boxSize="full" alt="Uploaded Image" objectFit="cover" src={src} />
  </MotionBox>
)

export interface ImagePartial {
  id: string
  albumId: string
  authorId: string
  imageExt: string
  file?: File
}

interface UploadedImageProps {
  image: ImagePartial
  onDelete?(): void
}

export const UploadedImage = ({ image, onDelete }: UploadedImageProps) => {
  const boxSize = useThumbnailSizing()
  const [deleteImage] = useDeleteImageMutation()

  return (
    <Tooltip label="Untitled Image">
      {({ isHovering }) => (
        <Box boxSize={boxSize} pos="relative">
          <Box boxSize="full" bg="flow.20" rounded="sm">
            <ImageThumbnail
              src={getImageUrl(
                image.authorId,
                image.albumId,
                image.id,
                image.imageExt,
              )}
            />
            <Center pos="absolute" inset={0} zIndex={-1}>
              <LogoLoadingAnimation size="128px" />
            </Center>
            <Box pos="absolute" zIndex={10} p={4} inset={0}>
              <MotionStack
                pos="absolute"
                p={1}
                right={2}
                bottom={2}
                spacing={1}
                rounded="full"
                direction="row"
                bg="background.full"
                exit={{ y: 8, opacity: 0 }}
                initial={{ y: 8, opacity: 0 }}
                animate={{
                  y: isHovering ? 0 : 8,
                  opacity: isHovering ? 1 : 0,
                }}
                transition={transitionMediumConfig}
                boxShadow="0 0 16px 0 rgba(0, 0, 0, 0.25)"
              >
                {/*<IconButton
                    p={2}
                    variant="ghost"
                    aria-label="Edit"
                    rounded="full"
                    icon={<EditIcon boxSize={5} />}
                  />*/}
                <IconButton
                  p={2}
                  variant="ghost"
                  aria-label="Delete"
                  rounded="full"
                  color="status.bad"
                  onClick={() =>
                    deleteImage({ variables: { imageId: image.id } }).then(
                      onDelete,
                    )
                  }
                  icon={<DeleteIcon boxSize={5} />}
                />
              </MotionStack>
            </Box>
          </Box>
        </Box>
      )}
    </Tooltip>
  )
}

interface QueuedImageProps {
  file: File
  isUploading: boolean
}

export const QueuedImage = ({ file, isUploading }: QueuedImageProps) => {
  const [dataUri, setDataUri] = useState<string>()
  const boxSize = useThumbnailSizing()

  useEffect(() => {
    getDataUriForBlob(file).then(setDataUri)
  }, [])

  return (
    <Tooltip label="Untitled Image">
      <Box boxSize={boxSize} bg="ui.20" pos="relative">
        <MotionFlex
          pos="absolute"
          inset={0}
          zIndex={100}
          align="end"
          color="ui.80"
          boxSize="full"
          bgGradient="linear(to-t, background.full, transparent)"
          exit={{ y: 32, opacity: 0 }}
          initial={{ y: 32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={transitionMediumConfig}
        >
          <Flex p={4} w="full" align="start">
            {isUploading ? (
              <HStack spacing={2}>
                <MotionSpinner>
                  <UploadIndicatorIcon color="inherit" boxSize={5} />
                </MotionSpinner>
                <Text textStyle="label.medium">Uploading...</Text>
              </HStack>
            ) : (
              <Flex w="full" align="end">
                <Text textStyle="label.small">Pending</Text>
              </Flex>
            )}
          </Flex>
        </MotionFlex>

        {dataUri ? (
          <Image boxSize="full" src={dataUri} />
        ) : (
          <Center boxSize="full">
            <Loader color="brand.100" />
          </Center>
        )}
      </Box>
    </Tooltip>
  )
}

export const ImageUploader = ({ onUpload: _onUpload }: ImageUploaderProps) => {
  const boxSize = useThumbnailSizing()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useBoolean(false)

  const onUpload: FormEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault()
    if (e.currentTarget.validity.valid) {
      _onUpload?.(e.currentTarget.files)
      setIsDragging.off()
    }
  }

  const onKeyboardUpload: KeyboardEventHandler<HTMLButtonElement> = (e) => {
    const KEYS = ['enter', ' ']

    if (KEYS.includes(e.key.toLowerCase())) {
      inputRef.current?.click()
    }
  }

  const onDropUpload: DragEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    if (e.currentTarget.validity.valid) {
      _onUpload?.(e.dataTransfer.files)
      setIsDragging.off()
    }
  }

  return (
    <Box h={boxSize} pos="relative">
      <Button
        d="flex"
        rounded="sm"
        size="none"
        variant="none"
        boxSize="full"
        onDrop={onDropUpload}
        onKeyDown={onKeyboardUpload}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={setIsDragging.on}
        onDragLeave={setIsDragging.off}
      >
        <chakra.label
          cursor="pointer"
          boxSize="full"
          htmlFor={IU_NAME}
          bg="flow.10"
          rounded="sm"
          _hover={{
            bg: 'flow.40',
            ['.' + IU_NAME]: {
              color: 'brand.primary.100',
            },
          }}
        >
          <AnimatePresence>
            <Box
              pos="relative"
              pointerEvents="none"
              overflow="hidden"
              boxSize="full"
            >
              {isDragging ? (
                <DragUploadPrompt />
              ) : (
                <ImageUploadPrompt>
                  <input
                    ref={inputRef}
                    id={IU_NAME}
                    multiple
                    type="file"
                    onInput={onUpload}
                    style={{ display: 'none' }}
                  />
                </ImageUploadPrompt>
              )}
            </Box>
          </AnimatePresence>
        </chakra.label>
      </Button>
    </Box>
  )
}
