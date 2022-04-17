import { useThumbnailSizing } from 'app/data/hooks/useThumbnailSizing'
import {
  Box,
  Button,
  Center,
  chakra,
  HStack,
  IconButton,
  Image,
  Text,
  useBoolean,
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
  MotionImage,
  MotionSpinner,
  MotionStack,
  transitionMediumConfig,
} from 'app/components/Motion'
import { Tooltip } from 'app/components/Tooltip'
import { UploadIndicatorIcon } from 'app/components/icons/UploadIndicatorIcon'
import { UploadCompleteIcon } from 'app/components/icons/UploadCompleteIcon'
import { DeleteIcon } from 'app/components/icons/DeleteIcon'
import { EditIcon } from 'app/components/icons/EditIcon'

export interface ImageUploaderProps {
  uploadedImageSrc?: string
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
      <UploadIcon
        className={IU_NAME}
        boxSize={['32px', null, '64px']}
        transitionDuration="fast"
        color="brand.primary.40"
      />
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

export const ImageUploader = ({
  uploadedImageSrc,
  onUpload: _onUpload,
}: ImageUploaderProps) => {
  const boxSize = useThumbnailSizing()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useBoolean(false)
  const [currentDataUri, setCurrentDataUri] = useState('')
  const [isUploading, setIsUploading] = useBoolean(false)
  const [uploadPercent, setUploadPercent] = useState(0)

  useEffect(() => {
    if (uploadedImageSrc && uploadedImageSrc !== currentDataUri) {
      if (currentDataUri) {
        console.error(
          "Can't set currentDataUri twice, there must be something wrong:",
          { currentDataUri },
        )
      }

      setIsUploading.on()
      setCurrentDataUri(uploadedImageSrc)
    }
  }, [uploadedImageSrc])

  const onUpload: FormEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault()
    _onUpload?.(e.currentTarget.files)
    setIsUploading.on()
  }

  const onKeyboardUpload: KeyboardEventHandler<HTMLButtonElement> = (e) => {
    const KEYS = ['enter', ' ']

    if (KEYS.includes(e.key.toLowerCase())) {
      inputRef.current?.click()
    }
  }

  const onDropUpload: DragEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    _onUpload?.(e.dataTransfer.files)
    setIsUploading.on()
  }

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>

    if (isUploading && uploadPercent !== DONE_PERCENT) {
      interval = setInterval(() => {
        setUploadPercent((percent) => {
          const newPercent = percent + Math.floor(Math.random() * 10) + 1

          if (newPercent >= DONE_PERCENT) {
            return DONE_PERCENT
          }

          return newPercent
        })
      }, 400)
    }

    return () => clearInterval(interval)
  }, [isUploading])

  const isUploadComplete = uploadPercent === DONE_PERCENT

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    if (isUploadComplete) {
      timeout = setTimeout(() => {
        setIsUploading.off()
      }, 2000)
    }

    return () => clearTimeout(timeout)
  }, [isUploadComplete])

  const shouldShowCompleteImage = isUploadComplete && !isUploading

  return (
    <Tooltip label="Upload">
      {({ isHovering }) => (
        <Box boxSize={boxSize} pos="relative">
          {shouldShowCompleteImage && (
            <Box boxSize="full">
              <ImageThumbnail src={currentDataUri} />
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
                >
                  <IconButton
                    p={2}
                    variant="ghost"
                    aria-label="Edit"
                    rounded="full"
                    icon={<EditIcon boxSize={5} />}
                  />
                  <IconButton
                    p={2}
                    variant="ghost"
                    aria-label="Delete"
                    rounded="full"
                    color="status.bad"
                    icon={<DeleteIcon boxSize={5} />}
                  />
                </MotionStack>
              </Box>
            </Box>
          )}
          {!shouldShowCompleteImage && (
            <Button
              d="flex"
              rounded="sm"
              size="none"
              variant="none"
              boxSize="full"
              pointerEvents={uploadedImageSrc ? 'none' : 'all'}
              onDrop={uploadedImageSrc ? undefined : onDropUpload}
              onKeyDown={uploadedImageSrc ? undefined : onKeyboardUpload}
              onDragOver={(e) =>
                uploadedImageSrc ? undefined : e.preventDefault()
              }
              onDragEnter={uploadedImageSrc ? undefined : setIsDragging.on}
              onDragLeave={uploadedImageSrc ? undefined : setIsDragging.off}
            >
              <chakra.label
                cursor="pointer"
                boxSize="full"
                htmlFor={IU_NAME}
                bg="flow.20"
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
                    <AnimatePresence exitBeforeEnter>
                      {isUploading && (
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
                          <HStack p={4} w="full" justify="space-between">
                            {isUploadComplete ? (
                              <UploadCompleteIcon
                                color="status.ok"
                                boxSize={5}
                              />
                            ) : (
                              <HStack spacing={2}>
                                <MotionSpinner>
                                  <UploadIndicatorIcon
                                    color="inherit"
                                    boxSize={5}
                                  />
                                </MotionSpinner>
                                <Text textStyle="label.medium">
                                  Uploading..
                                </Text>
                              </HStack>
                            )}

                            <Text textStyle="label.small">
                              {isUploadComplete ? 'Done!' : `${uploadPercent}%`}
                            </Text>
                          </HStack>
                        </MotionFlex>
                      )}
                    </AnimatePresence>
                    {currentDataUri && <ImageThumbnail src={currentDataUri} />}
                    {!currentDataUri &&
                      (isDragging ? (
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
                      ))}
                  </Box>
                </AnimatePresence>
              </chakra.label>
            </Button>
          )}
        </Box>
      )}
    </Tooltip>
  )
}
