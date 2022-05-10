import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ContextIcon } from 'app/components/icons/ContextIcon'
import { Favourite } from 'app/components/views/Favourite'
import { useFavouriteImageMutation } from 'generated/graphql.client'
import { getImageUrlFromItem } from 'app/services/cdn.service'
import { Link } from 'app/components/Link'
import { useRoutes } from 'app/data/hooks/useRoutes'
import { Maybe } from 'global'
import { useDisclosure } from '@chakra-ui/hooks'
import { HeartIcon } from 'app/components/icons/HeartIcon'
import { FlagIcon } from 'app/components/icons/FlagIcon'
import { useOptimisticFavourites } from 'app/data/hooks/useOptimisticFavourites'
import { useModal } from 'app/data/hooks/useModal'

interface FeedBoxProps {
  image: {
    id: string
    albumId: string
    author?: Maybe<{
      id: string
      username: string
      nickname?: Maybe<string>
      avatarUrl?: Maybe<string>
    }>
    album: {
      title?: Maybe<string>
    }
    authorId: string
    imageExt: string
    title?: Maybe<string>
    description?: Maybe<string>
  }
}

const ContextMenu = ({ image }: FeedBoxProps) => {
  const [favouriteImage] = useFavouriteImageMutation()
  const [userHasLoved, updateFavourite] = useOptimisticFavourites(
    image,
    favouriteImage,
  )

  const [openModal] = useModal('reportImageModal', {
    image,
  })

  return (
    <Menu placement="bottom-end">
      {({ isOpen }) => (
        <>
          <MenuButton
            as={IconButton}
            aria-label="More"
            p={3}
            variant="ghost"
            icon={<ContextIcon boxSize={6} />}
            bg={isOpen ? 'ui.5' : 'transparent'}
          />
          <MenuList minW="200px">
            <MenuItem
              color="special.heart"
              icon={<HeartIcon />}
              onClick={updateFavourite}
            >
              {userHasLoved ? 'Unfavourite' : 'Favourite'}
            </MenuItem>
            <MenuDivider color="ui.5" my={2} />
            <MenuItem
              onClick={() => openModal()}
              color="status.bad"
              icon={<FlagIcon />}
            >
              Report
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  )
}

export const FeedBox = ({ image }: FeedBoxProps) => {
  const Routes = useRoutes()
  const [favouriteImage] = useFavouriteImageMutation()

  return (
    <VStack
      spacing={0}
      w="full"
      align="start"
      bg="flow.20"
      rounded={[0, null, 'md']}
    >
      <HStack w="full" p={[3, null, 4]} justify="space-between">
        {image.author && (
          <Link href={Routes.toUserPage(image.author.id)}>
            <HStack spacing={4}>
              <Avatar boxSize="48px" src={image.author.avatarUrl ?? ''} />
              <Text textStyle="label.medium">
                {image.author.nickname ?? image.author.username}
              </Text>
            </HStack>
          </Link>
        )}
        <ContextMenu image={image} />
      </HStack>
      <Box w="full" minH="200px" bg="flow.20">
        <Image w="full" h="auto" src={getImageUrlFromItem(image)} />
      </Box>
      <HStack w="full" p={[3, null, 4]} justify="space-between">
        <Favourite item={image} mutation={favouriteImage} />
        <HStack
          spacing={2}
          px={[2, null, 4]}
          color="ui.100"
          textStyle="paragraph.medium"
        >
          <Link href={Routes.toImagePage(image.albumId, image.id)}>
            <Text>{image.title ?? 'Untitled Image'}</Text>
          </Link>
          <Text cursor="default" color="ui.40">
            from
          </Text>
          <Link href={Routes.toAlbumPage(image.albumId)}>
            <Text>{image.album.title}</Text>
          </Link>
        </HStack>
      </HStack>
    </VStack>
  )
}
