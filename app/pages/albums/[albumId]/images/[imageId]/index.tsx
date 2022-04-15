import {
  BlitzPage,
  Head,
  invokeWithMiddleware,
  PromiseReturnType,
  Routes,
  useParam,
  useQuery,
} from 'blitz'
import {
  Box,
  Button,
  Center,
  HStack,
  IconButton,
  Image as ChakraImage,
  StackDivider,
  useBoolean,
  useDisclosure,
  useToken,
} from '@chakra-ui/react'
import { DeleteImageModal } from 'app/components/modals/DeleteImageModal'
import { InvertCircleCornerIcon } from 'app/components/icons/InvertCircleCornerIcon'
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
import { ImageMeta } from 'app/meta/ImageMeta'
import { SimpleMeta } from 'app/meta/SimpleMeta'
import { getGlobalServerSideProps } from 'app/utils/getGlobalServerSideProps'
import { SiteDetails } from 'app/constants'
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { getImageUrlFromItem } from 'app/services/cdn/client.service'

export interface ImagePageProps {
  initialData: PromiseReturnType<typeof getImage>
}

export const getServerSideProps = getGlobalServerSideProps<ImagePageProps>(
  async ({ query, req, res }) => {
    const initialData = await invokeWithMiddleware(
      getImage,
      { id: query.imageId },
      { req, res },
    )

    return {
      props: {
        initialData,
      },
    }
  },
)

const ShowImagePage: BlitzPage<ImagePageProps> = ({
  initialData,
  currentUser,
}) => {
  const { goBack } = usePage()
  const bgFull = useToken('colors', 'background.full')
  const deleteConfirmDisclosure = useDisclosure()
  const [isFullscreen, setIsFullscreen] = useBoolean(false)
  const albumId = useParam('albumId', 'string')
  const imageId = useParam('imageId', 'string')
  const [image] = useQuery(getImage, { id: imageId }, { initialData })
  const [isLoaded, setLoaded] = useBoolean(false)

  const [isHovering, setHovering] = useBoolean(false)

  const isAuthor = image.authorId === currentUser?.id

  return (
    <>
      <SimpleMeta
        title={`${SiteDetails.Name} | ${image.title ?? 'Untitled Image'} by ${
          image.author?.nickname ?? image.author?.username
        }`}
        description={image.description ?? SiteDetails.Description}
      />
      <ImageMeta
        imageWidth="1200"
        imageHeight="630"
        imageType="image/png"
        imageAlt={image.title ?? 'Untitled Image'}
        imageUrl={getImageUrlFromItem(image)}
      />
      <Center boxSize="full" pos="relative">
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
              src={getImageUrlFromItem(image)}
              objectFit="cover"
            />
          </MotionBox>
          <Center boxSize="full" backdropFilter="blur(45px)" bg="bg-overlay">
            {albumId && imageId && (
              <Center pos="absolute" zIndex={1} top={0} left={0} right={0}>
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
                        color="background.full"
                      />
                      <Box
                        pos="relative"
                        p={4}
                        bg="background.full"
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
                        <HStack
                          spacing={4}
                          divider={<StackDivider color="ui.5" />}
                        >
                          <HStack spacing={4}>
                            <Button onClick={goBack}>Go back</Button>
                            <Tooltip label="Fullscreen">
                              <IconButton
                                onClick={setIsFullscreen.toggle}
                                p={3}
                                aria-label="Fullscreen"
                                icon={<FullscreenIcon />}
                              />
                            </Tooltip>
                          </HStack>
                          {isAuthor && (
                            <HStack spacing={4}>
                              {/*<Tooltip label="Edit">
                                <IconButton
                                  p={3}
                                  as={Link}
                                  aria-label="Edit"
                                  icon={<EditIcon />}
                                  href={Routes.EditImagePage({
                                    albumId: albumId ?? '',
                                    imageId: image.id,
                                  })}
                                />
                              </Tooltip>*/}

                              <Tooltip label="Delete">
                                <IconButton
                                  p={3}
                                  aria-label="Delete"
                                  icon={<DeleteIcon color="status.bad" />}
                                  onClick={deleteConfirmDisclosure.onOpen}
                                />
                              </Tooltip>
                            </HStack>
                          )}
                        </HStack>
                      </Box>
                      <InvertCircleCornerIcon color="background.full" />
                    </HStack>
                  </MotionBox>
                </Box>
              </Center>
            )}
            <MotionBox
              d="flex"
              transition={transitionConfig}
              animate={{ opacity: Number(isLoaded) }}
              onClick={setIsFullscreen.toggle}
            >
              <ControlledZoom
                isZoomed={isFullscreen}
                overlayBgColorStart="transparent"
                overlayBgColorEnd={bgFull}
                onZoomChange={console.log}
              >
                <ChakraImage
                  maxH="calc(100vh - 90px)"
                  objectFit="contain"
                  src={getImageUrlFromItem(image)}
                  onLoad={setLoaded.on}
                />
              </ControlledZoom>
            </MotionBox>
          </Center>
        </Center>
      </Center>
    </>
  )
}

ShowImagePage.getLayout = (page) => <Layout hideFooter>{page}</Layout>

export default ShowImagePage
