import { useEffect, useMemo, useState } from 'react'
import { Box } from '@chakra-ui/layout'
import { AnimatePresence } from 'framer-motion'
import { MotionImage, transitionConfig } from 'app/components/Motion'
import { SiteDetails } from 'app/constants'
import { useBoolean } from '@chakra-ui/react'
import {
  BaseImageItemType,
  getImageUrlFromItem,
} from 'app/services/cdn.service'

interface AutoImageCarouselProps {
  items: Array<BaseImageItemType>
}

const SHOWCASE_INCREMENT_TIME = 30000

const nextIndex = (length: number) => (index: number) => (index + 1) % length

export const AutoImageCarousel = ({ items = [] }: AutoImageCarouselProps) => {
  const [currentIndex, setIndex] = useState(0)
  const [doneFirstIteration, setDoneFirstIteration] = useBoolean(false)
  const [allImagesAreLoaded, setAllImagesAreLoaded] = useBoolean(false)

  const next = useMemo(() => nextIndex(items.length), [items.length])

  const preloadNextImage = (item: BaseImageItemType) =>
    new Promise((resolve, reject) => {
      const image = new Image()

      image.onload = () => resolve(image.src)
      image.onerror = (e) => reject(e)

      image.src = getImageUrlFromItem(item)
    })

  const incrementIndex = () => {
    const nextIndex = next(currentIndex)

    if (!doneFirstIteration) {
      setDoneFirstIteration.on()
    }

    const isEndOfLoop = nextIndex === 0
    if (isEndOfLoop) {
      setAllImagesAreLoaded.on()
    }

    if (isEndOfLoop || allImagesAreLoaded) {
      setIndex(nextIndex)
    } else {
      const nextItem = items[nextIndex]
      if (nextItem) {
        preloadNextImage(nextItem)
          .then(() => setIndex(nextIndex))
          .catch(() => setIndex(nextIndex + 1))
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(incrementIndex, SHOWCASE_INCREMENT_TIME)
    return () => clearInterval(interval)
  }, [currentIndex, allImagesAreLoaded])

  const itemArray = useMemo(
    () =>
      items
        .filter((_, i) => i === currentIndex)
        .map((item) => (
          <MotionImage
            key={item.id}
            pos="absolute"
            inset={0}
            w="full"
            h="full"
            objectFit="cover"
            objectPosition="center calc(50% + 45px)"
            alt={SiteDetails.Name}
            transition={transitionConfig}
            src={getImageUrlFromItem(item)}
            initial={{
              opacity: Number(!doneFirstIteration),
              x: !doneFirstIteration ? '0%' : '100%',
            }}
            animate={{ opacity: 1, x: '0%' }}
            exit={{ x: '-100%' }}
          />
        )),
    [currentIndex, items.length],
  )

  return (
    <Box pos="absolute" inset={0} opacity={0.6} boxSize="full">
      <Box
        pos="absolute"
        inset={0}
        zIndex={1}
        boxSize="full"
        bg="background.full"
        opacity={0.5}
      />
      <AnimatePresence>{itemArray}</AnimatePresence>
    </Box>
  )
}

export default AutoImageCarousel
