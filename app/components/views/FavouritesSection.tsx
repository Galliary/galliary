import { Routes } from 'blitz'
import { useMemo } from 'react'
import {
  AspectRatio,
  Box,
  HStack,
  Img,
  Text,
  useToken,
  VStack,
} from '@chakra-ui/react'
import { Maybe } from 'types'
import { MotionBox, transitionFastConfig } from 'app/components/Motion'
import { CDN, ImageType } from 'app/utils/cdn'
import { Tooltip } from 'app/components/Tooltip'
import { Link } from 'app/components/Link'

type AnyItem =
  | { id: string; sourceId: string; title: Maybe<string> }
  | { id: string; sourceId: string; albumId: string; title: Maybe<string> }
  | {
      id: string
      avatarUrl: Maybe<string>
      username: string
      nickname: Maybe<string>
    }

interface FavouritesSectionProps {
  label: string
  items: AnyItem[]
}

interface FavouriteItem {
  item: Maybe<AnyItem>
}

export const FavouriteItem = ({ item }: FavouriteItem) => {
  const [ui10] = useToken('colors', ['ui.10'])

  const href = useMemo(() => {
    if (!item) {
      return ''
    }

    if ('username' in item) {
      return Routes.UserPage({ userId: item.username })
    } else if ('albumId' in item) {
      return Routes.ShowImagePage({ imageId: item.id, albumId: item.albumId })
    } else {
      return Routes.ShowAlbumPage({ albumId: item.id })
    }
  }, [])

  const imageUrl = useMemo(() => {
    if (!item) {
      return ''
    }

    if ('username' in item) {
      return item.avatarUrl ?? ''
    } else {
      return CDN.getImageUrl(item.sourceId, ImageType.Small)
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

  return item ? (
    <Link
      boxSize="full"
      href={href}
      rounded={'username' in item ? 'full' : 'md'}
    >
      <Tooltip label={label}>
        <AspectRatio boxSize="full" ratio={1}>
          <MotionBox
            bg="ui.5"
            rounded={'username' in item ? 'full' : 'md'}
            boxSize="full"
            transition={transitionFastConfig}
            whileHover={{ backgroundColor: ui10, opacity: 0.8 }}
          >
            <Img alt={label} boxSize="full" src={imageUrl} />
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
