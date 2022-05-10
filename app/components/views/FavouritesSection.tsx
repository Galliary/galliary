import { useMemo } from 'react'
import {
  AspectRatio,
  Box,
  Flex,
  HStack,
  Img,
  SimpleGrid,
  Text,
  useConst,
  useToken,
  VStack,
} from '@chakra-ui/react'
import { Link } from 'app/components/Link'
import { Tooltip } from 'app/components/Tooltip'
import { MotionBox, transitionFastConfig } from 'app/components/Motion'
import { getImageUrlFromItem } from 'app/services/cdn.service'
import { Maybe } from 'global'
import { useRoutes } from 'app/data/hooks/useRoutes'

type AnyItem =
  | {
      id: string
      authorId: string
      coverExt: string
      title?: Maybe<string>
      images?: Maybe<
        Array<{
          id: string
          albumId: string
          authorId: string
          imageExt: string
        }>
      >
    }
  | {
      id: string
      authorId: string
      imageExt: string
      albumId: string
      title?: Maybe<string>
    }
  | {
      id: string
      avatarUrl?: Maybe<string>
      username: string
      nickname?: Maybe<string>
    }

interface FavouritesSectionProps {
  label: string
  items: AnyItem[]
}

interface FavouriteItem {
  item: Maybe<AnyItem>
}

export const FavouriteItem = ({ item }: FavouriteItem) => {
  const routes = useRoutes()
  const [ui10] = useToken('colors', ['ui.10'])

  const href = useMemo(() => {
    if (!item) {
      return ''
    }

    if ('username' in item) {
      return routes.toUserPage(item.id)
    } else if ('albumId' in item) {
      return routes.toImagePage(item.albumId, item.id)
    } else {
      return routes.toAlbumPage(item.id)
    }
  }, [])

  const imageUrl = useMemo(() => {
    if (!item) {
      return ''
    }

    if ('username' in item) {
      return item.avatarUrl ?? ''
    } else {
      return getImageUrlFromItem(item)
    }
  }, [])

  const label = useMemo(() => {
    if (!item) {
      return ''
    }

    if ('username' in item) {
      return item.nickname ?? item.username
    } else {
      return item.title ?? 'Untitled'
    }
  }, [])

  const imageDisplay = useConst(
    () =>
      item &&
      'images' in item &&
      [...(item.images ?? [])]
        .slice(0, 4)
        .map((item, i) => (
          <Flex
            key={i}
            boxSize="full"
            grow={0}
            shrink={0}
            overflow="hidden"
            bgImg={getImageUrlFromItem(item)}
            bgRepeat="no-repeat"
            bgPos="center"
            bgSize="cover"
          />
        )),
  )

  return item ? (
    <Link
      boxSize="full"
      href={href}
      rounded={'username' in item ? 'full' : 'sm'}
    >
      <Tooltip label={label}>
        <AspectRatio boxSize="full" ratio={1}>
          <MotionBox
            bg="ui.5"
            rounded={'username' in item ? 'full' : 'sm'}
            boxSize="full"
            transition={transitionFastConfig}
            whileHover={{ backgroundColor: ui10, opacity: 0.8 }}
          >
            {'imageExt' in item ? (
              <Img alt={label} boxSize="full" src={imageUrl} />
            ) : (
              <SimpleGrid boxSize="full" columns={2}>
                {imageDisplay}
              </SimpleGrid>
            )}
          </MotionBox>
        </AspectRatio>
      </Tooltip>
    </Link>
  ) : (
    <Box boxSize="full" bg="flow.20" rounded="md" />
  )
}

export const FavouritesSection = ({ label, items }: FavouritesSectionProps) => {
  const [a, b, c, d, e, f] = items
  const none = items.length === 0

  return none ? null : (
    <VStack w="full" align="start">
      <Text color="ui.60" textStyle="overline">
        {label}
      </Text>
      <HStack boxSize="full">
        <FavouriteItem item={a} />
        <FavouriteItem item={b} />
        <FavouriteItem item={c} />
      </HStack>
      <HStack boxSize="full">
        <FavouriteItem item={d} />
        <FavouriteItem item={e} />
        <FavouriteItem item={f} />
      </HStack>
    </VStack>
  )
}
