import { Suspense } from 'react'
import { BlitzPage, Routes, useParam, useQuery } from 'blitz'
import {
  Box,
  Button,
  Center,
  HStack,
  IconButton,
  Image as ChakraImage,
  useBoolean,
  useDisclosure,
} from '@chakra-ui/react'
import { DeleteImageModal } from 'app/components/modals/DeleteImageModal'
import { InvertCircleCornerIcon } from 'app/components/icons/InvertCircleCornerIcon'
import { CDN } from 'app/utils/cdn'
import {
  MotionBox,
  transitionConfig,
  transitionMediumConfig,
} from 'app/components/Motion'
import { EditIcon } from 'app/components/icons/EditIcon'
import { FullscreenIcon } from 'app/components/icons/FullscreenIcon'
import { usePage } from 'app/data/hooks/usePage'
import getImage from 'app/data/queries/images/getImage'
import { DeleteIcon } from 'app/components/icons/DeleteIcon'
import { LogoLoadingAnimation } from 'app/components/views/LogoLoadingAnimation'
import { Tooltip } from 'app/components/Tooltip'
import { Link } from 'app/components/Link'
import Layout from 'app/layouts/Layout'

export const ImageView = () => {
  const { goBack } = usePage()
  const deleteConfirmDisclosure = useDisclosure()
  const albumId = useParam('albumId', 'string')
  const imageId = useParam('imageId', 'string')
  const [image] = useQuery(getImage, { id: imageId })

  const [isLoaded, setLoaded] = useBoolean(false)
  const [isHovering, setHovering] = useBoolean(false)

  return (
    <>
      <DeleteImageModal
        imageId={image.id}
        disclosure={deleteConfirmDisclosure}
      />
      <Center pos="relative" boxSize="full" overflow="hidden">
        <Box
          zIndex={-1}
          pos="absolute"
          inset={0}
          boxSize="full"
          bg={`rgb(${image.colors[0]}, ${image.colors[1]}, ${image.colors[2]})`}
        />
        {!isLoaded && (
          <Center
            pointerEvents="none"
            userSelect="none"
            pos="absolute"
            zIndex={2}
            inset={0}
            margin="auto"
          >
            <LogoLoadingAnimation />
          </Center>
        )}
        <MotionBox
          transition={transitionConfig}
          animate={{ opacity: Number(isLoaded) }}
        >
          <ChakraImage
            pos="absolute"
            boxSize="full"
            inset={0}
            zIndex={-1}
            src={CDN.getImageUrl(image.sourceId)}
            objectFit="cover"
          />
        </MotionBox>
        <Center boxSize="full" backdropFilter="blur(45px)" bg="bg-overlay">
          {albumId && imageId && (
            <Center pos="absolute" top={0} left={0} right={0}>
              <Box
                pb={6}
                overflow="hidden"
                onPointerEnter={setHovering.on}
                onPointerLeave={setHovering.off}
              >
                <MotionBox
                  initial={{ y: '0%' }}
                  animate={
                    isHovering
                      ? {
                          y: '0%',
                          transition: {
                            ...transitionMediumConfig,
                            delay: 0,
                          },
                        }
                      : {
                          y: '-100%',
                          transition: {
                            ...transitionConfig,
                            delay: 2,
                          },
                        }
                  }
                  _hover={{
                    transitionDelay: 0,
                  }}
                >
                  <HStack spacing={0} align="start">
                    <InvertCircleCornerIcon
                      transform="rotate(90deg)"
                      color="background.full-darker"
                    />
                    <Box
                      pos="relative"
                      p={4}
                      bg="background.full-darker"
                      roundedBottom="lg"
                    >
                      <MotionBox
                        zIndex={-1}
                        pos="absolute"
                        bottom={-6}
                        w="30%"
                        h={6}
                        roundedBottom="md"
                        bg="background.full"
                        insetX={0}
                        marginX="auto"
                        animate={
                          isHovering
                            ? {
                                y: -6 * 4,
                                transition: {
                                  ...transitionMediumConfig,
                                  delay: 0,
                                },
                              }
                            : {
                                y: 0,
                                transition: {
                                  ...transitionConfig,
                                  delay: 2,
                                },
                              }
                        }
                      >
                        <Box
                          pos="absolute"
                          insetX={3}
                          bottom={4}
                          rounded="md"
                          bg="ui.5"
                          h={1}
                        />
                        <Box
                          pos="absolute"
                          insetX={6}
                          bottom={2}
                          rounded="md"
                          bg="ui.5"
                          h={1}
                        />
                      </MotionBox>
                      <HStack spacing={4}>
                        <Button onClick={goBack}>Go back</Button>
                        <Tooltip label="Edit Image">
                          <IconButton
                            p={3}
                            as={Link}
                            aria-label="Edit Image"
                            icon={<EditIcon />}
                            href={Routes.EditImagePage({
                              albumId: albumId ?? '',
                              imageId: image.id,
                            })}
                          />
                        </Tooltip>
                        <Tooltip label="Fullscreen">
                          {/* TODO: Actually implement this */}
                          <IconButton
                            p={3}
                            aria-label="Fullscreen"
                            icon={<FullscreenIcon />}
                          />
                        </Tooltip>
                        <Tooltip label="Delete Image">
                          <IconButton
                            p={3}
                            aria-label="Delete Image"
                            icon={<DeleteIcon color="status.bad" />}
                            onClick={deleteConfirmDisclosure.onOpen}
                          />
                        </Tooltip>
                      </HStack>
                    </Box>
                    <InvertCircleCornerIcon color="background.full-darker" />
                  </HStack>
                </MotionBox>
              </Box>
            </Center>
          )}
          <MotionBox
            transition={transitionConfig}
            animate={{ opacity: Number(isLoaded) }}
          >
            <ChakraImage
              objectFit="contain"
              src={CDN.getImageUrl(image.sourceId)}
              onLoad={setLoaded.on}
            />
          </MotionBox>
        </Center>
      </Center>
    </>
  )
}

const ShowImagePage: BlitzPage = () => {
  return (
    <Center boxSize="full" pos="relative">
      <Suspense fallback={<div>Loading...</div>}>
        <ImageView />
      </Suspense>
    </Center>
  )
}

ShowImagePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowImagePage
