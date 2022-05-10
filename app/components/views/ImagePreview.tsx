import {
  Box,
  Center,
  Text,
  useBoolean,
  useBreakpointValue,
  useToken,
} from '@chakra-ui/react'
import { Suspense } from 'react'
import { MotionBox, transitionConfig } from 'app/components/Motion'
import { useThumbnailSizing } from 'app/data/hooks/useThumbnailSizing'
import { Favourite } from 'app/components/views/Favourite'
import { Tooltip } from 'app/components/Tooltip'
import { Link } from 'app/components/Link'
import { LogoLoadingAnimation } from 'app/components/views/LogoLoadingAnimation'
import { Loader } from 'app/components/views/Loader'
import { AnimatePresence } from 'framer-motion'
import { getImageUrlFromItem } from 'app/services/cdn.service'
import { Image as ImageComponent } from 'app/components/Image'
import { useRoutes } from 'app/data/hooks/useRoutes'
import { useFavouriteImageMutation } from 'generated/graphql.client'
import { Maybe } from 'global'

export interface EntityPreviewProps {
  item: {
    id: string
    title?: Maybe<string>
    albumId: string
    authorId: string
    colors: number[]
    imageExt: string
    userFavourites?: Maybe<Array<{ id: string }>>
  }
}

export const ImagePreview = ({ item: image }: EntityPreviewProps) => {
  const routes = useRoutes()
  const boxSize = useThumbnailSizing()
  const boxSizeImage = useBreakpointValue(useToken('sizes', boxSize))
  const [favouriteImage] = useFavouriteImageMutation()
  const [hasImageLoaded, setHasImageLoaded] = useBoolean(false)
  const [hasImageErrored, setHasImageErrored] = useBoolean(false)

  return (
    <Tooltip label={image.title ?? 'Untitled Image'}>
      {({ isHovering }) => (
        <Link
          d="flex"
          pos="relative"
          aria-label={image.title ?? 'Untitled Image'}
          href={routes.toImagePage(image.albumId, image.id)}
        >
          <AnimatePresence>
            <MotionBox
              pos="absolute"
              zIndex={10}
              top={0}
              left={0}
              p={2}
              initial={{
                scale: 0,
                opacity: 0,
                y: 0,
              }}
              exit={{
                scale: 0,
                opacity: 0,
                y: 0,
              }}
              animate={{
                scale: Number(isHovering),
                opacity: Number(isHovering),
                y: Number(!isHovering) * 16,
              }}
            >
              <Suspense fallback={<Loader />}>
                <Favourite item={image} mutation={favouriteImage} />
              </Suspense>
            </MotionBox>
          </AnimatePresence>
          <Box pos="relative" boxSize={boxSize} bg="flow.20" overflow="hidden">
            <Box
              pos="absolute"
              inset={0}
              filter="blur(60px)"
              overflow="hidden"
              boxSize="full"
              bg={`rgba(${image.colors[0]}, ${image.colors[1]}, ${image.colors[2]}, 0.4)`}
            />
            {hasImageErrored && (
              <Center boxSize="full">
                <Text textStyle="label.medium">{image.title}</Text>
              </Center>
            )}
            {!(hasImageErrored || hasImageLoaded) && (
              <MotionBox
                pointerEvents="none"
                userSelect="none"
                transition={transitionConfig}
                animate={{ opacity: Number(!hasImageLoaded) }}
              >
                <Center zIndex={1} boxSize="full" inset={0} pos="absolute">
                  <LogoLoadingAnimation size="60%" />
                </Center>
              </MotionBox>
            )}
            {!hasImageErrored && (
              <MotionBox
                transition={transitionConfig}
                animate={{ opacity: Number(hasImageLoaded) }}
                pos="absolute"
                inset={0}
                boxSize={boxSize}
              >
                <ImageComponent
                  loading="lazy"
                  overflow="hidden"
                  objectFit="cover"
                  height={boxSizeImage}
                  width={boxSizeImage}
                  alt={image.title ?? image.id}
                  src={getImageUrlFromItem(image)}
                  onLoadComplete={setHasImageLoaded.on}
                  onError={setHasImageErrored.on}
                />
              </MotionBox>
            )}
          </Box>
        </Link>
      )}
    </Tooltip>
  )
}
