import {
  BlitzPage,
  Head,
  invokeWithMiddleware,
  PromiseReturnType,
  usePaginatedQuery,
} from 'blitz'
import Layout from 'app/layouts/Layout'
import { Box, Text, VStack } from '@chakra-ui/layout'
import { CDN, ImageType, StaticImages } from 'app/utils/cdn'
import { ImageMeta } from 'app/meta/ImageMeta'
import { usePage } from 'app/data/hooks/usePage'
import { SimpleMeta } from 'app/meta/SimpleMeta'
import getAlbums from 'app/data/queries/albums/getAlbums'
import { AddNewItem } from 'app/components/views/AddNewItem'
import { AlbumPreview } from 'app/components/views/AlbumPreview'
import { useThumbnailSizing } from 'app/data/hooks/useThumbnailSizing'
import { GalleryViewController } from 'app/controllers/GalleryViewController'
import { getGlobalServerSideProps } from 'app/utils/getGlobalServerSideProps'
import { OrganizationInfo } from 'app/meta/OrganizationInfo'
import { SiteDetails } from 'app/constants'
import { Center, Image } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import { MotionImage, transitionConfig } from 'app/components/Motion'
import { useEffect, useMemo, useState } from 'react'

const ITEMS_PER_PAGE = 42

export interface HomeProps {
  initialData: PromiseReturnType<typeof getAlbums>
}

export const getServerSideProps = getGlobalServerSideProps(
  async ({ query, req, res }) => {
    const params: Parameters<typeof getAlbums>[0] = {
      orderBy: { id: 'asc' },
      skip: ITEMS_PER_PAGE * Number(query.page ?? 0) || 0,
      take: ITEMS_PER_PAGE,
    }

    const initialData = await invokeWithMiddleware(getAlbums, params, {
      req,
      res,
    })

    return {
      props: {
        initialData,
      },
    }
  },
)

interface AlbumShowcaseCarouselProps {
  albums: HomeProps['initialData']['albums']
}

const SHOWCASE_INCREMENT_TIME = 30000

const AlbumShowcaseCarousel = ({ albums }: AlbumShowcaseCarouselProps) => {
  const [hasDoneFirstLoop, setHasDoneFirstLoop] = useState(false)
  const [currentIndex, setIndex] = useState(0)

  const incIndex = () =>
    setIndex((c) => {
      if (c === albums.length - 1) {
        return 0
      }
      if (!hasDoneFirstLoop) {
        setHasDoneFirstLoop(true)
      }
      return c + 1
    })

  useEffect(() => {
    const interval = setInterval(incIndex, SHOWCASE_INCREMENT_TIME)
    return () => clearInterval(interval)
  }, [])

  return (
    <Box pos="absolute" inset={0} opacity={0.6} boxSize="full">
      <AnimatePresence>
        {albums
          .filter((_, i) => i === currentIndex)
          .map((album, index) => (
            <MotionImage
              key={album.id}
              layoutId={album.id}
              pos="absolute"
              inset={0}
              w="full"
              h="full"
              objectFit="cover"
              filter="blur(32px)"
              alt={SiteDetails.Name}
              transition={transitionConfig}
              src={CDN.getImageUrl(album.sourceId, ImageType.Small)}
              initial={{
                opacity: Number(!hasDoneFirstLoop),
                x: !hasDoneFirstLoop ? '0%' : '100%',
              }}
              animate={{ opacity: 1, x: '0%' }}
              exit={{ opacity: 0, x: '-100%' }}
            />
          ))}
      </AnimatePresence>
    </Box>
  )
}

const Home: BlitzPage<HomeProps> = ({ initialData }) => {
  const { page } = usePage()
  const [{ sizeStyle: size }] = useThumbnailSizing()

  const [{ albums, hasMore }] = usePaginatedQuery(
    getAlbums,
    {
      orderBy: { id: 'asc' },
      skip: ITEMS_PER_PAGE * page,
      take: ITEMS_PER_PAGE,
    },
    {
      initialData,
    },
  )

  const filledAlbums = [
    ...albums,
    ...[...Array(ITEMS_PER_PAGE - albums.length)].fill(null),
  ]

  const randomFeaturedAlbums = useMemo(
    () => [...albums].sort(() => 0.5 - Math.random()),
    [],
  )

  return (
    <>
      <SimpleMeta />
      <ImageMeta
        imageWidth="1200"
        imageHeight="630"
        imageType="image/png"
        imageAlt={SiteDetails.Name}
        imageUrl={CDN.getImageUrl(StaticImages.SocialPreview, ImageType.Social)}
      />
      <OrganizationInfo />
      <VStack w="full" spacing={8}>
        <Center
          p={8}
          w="full"
          pos="relative"
          overflow="hidden"
          h="banner.height"
          textAlign="center"
        >
          <Text as="h2" fontSize="24px" zIndex={10} color="ui.100">
            {SiteDetails.Description}
          </Text>
          <AlbumShowcaseCarousel albums={randomFeaturedAlbums} />
        </Center>
        <GalleryViewController
          data={filledAlbums}
          hasMore={hasMore}
          addPrompt={<AddNewItem />}
          onDisplay={(data) =>
            data ? (
              <Box as="li">
                <AlbumPreview item={data} />
              </Box>
            ) : (
              <Box as="li" bg="ui.5" boxSize={size} />
            )
          }
        />
      </VStack>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home
