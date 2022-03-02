import { Suspense } from "react"
import { BlitzPage, Routes, useParam, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import getImage from "app/images/queries/getImage"
import { CDN, ImageType } from "app/core/utils/cdn"
import {
  Box,
  Button,
  Center,
  HStack,
  IconButton,
  Image as ChakraImage,
  Spinner,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react"
import { Tooltip } from "app/core/components/Tooltip"
import { EditIcon } from "app/core/icons/EditIcon"
import { DeleteIcon } from "app/core/icons/DeleteIcon"
import { Link } from "app/core/components/Link"
import { MotionBox, transitionConfig, transitionMediumConfig } from "app/core/components/MotionBox"
import { DeleteImageModal } from "app/core/modals/DeleteImageModal"
import { FullscreenIcon } from "app/core/icons/FullscreenIcon"
import { LoadingIcon } from "app/core/icons/LoadingIcon"
import { LoadingIconGroup } from "app/core/components/LoadingIconGroup"
import { usePage } from "app/core/hooks/usePage"

export const ImageView = () => {
  const { goBack } = usePage()
  const deleteConfirmDisclosure = useDisclosure()
  const albumId = useParam("albumId", "string")
  const imageId = useParam("imageId", "string")
  const [image] = useQuery(getImage, { id: imageId })

  const [isLoaded, setLoaded] = useBoolean(false)

  return (
    <>
      <DeleteImageModal disclosure={deleteConfirmDisclosure} />
      <Center pos="relative" boxSize="full">
        {!isLoaded && (
          <Center
            pointerEvents="none"
            userSelect="none"
            pos="absolute"
            zIndex={2}
            inset={0}
            margin="auto"
          >
            <LoadingIconGroup />
          </Center>
        )}
        <MotionBox transition={transitionConfig} animate={{ opacity: Number(isLoaded) }}>
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
            <Center pos="absolute" p={6} top={0} left={0} right={0}>
              <MotionBox
                initial={{ opacity: 1 }}
                animate={{
                  opacity: 0,
                  transition: {
                    ...transitionConfig,
                    delay: 2,
                  },
                }}
                whileHover={{
                  opacity: 1,
                  transition: {
                    ...transitionMediumConfig,
                    delay: 0,
                  },
                }}
                _hover={{
                  transitionDelay: 0,
                }}
              >
                <HStack spacing={4} p={4} bg="background.full" rounded="lg">
                  <Button onClick={goBack}>Go back</Button>
                  <Tooltip label="Edit Image">
                    <IconButton
                      p={3}
                      as={Link}
                      aria-label="Edit Image"
                      icon={<EditIcon />}
                      href={Routes.EditImagePage({ imageId: image.id })}
                    />
                  </Tooltip>
                  <Tooltip label="Fullscreen">
                    {/* TODO: Actually implement this */}
                    <IconButton p={3} aria-label="Fullscreen" icon={<FullscreenIcon />} />
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
              </MotionBox>
            </Center>
          )}
          <MotionBox transition={transitionConfig} animate={{ opacity: Number(isLoaded) }}>
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

ShowImagePage.authenticate = true
ShowImagePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowImagePage
