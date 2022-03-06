import { useState } from 'react'
import { useMutation } from 'blitz'
import { Album, Image, User } from '@prisma/client'
import favouriteAlbum from 'app/data/mutations/albums/favouriteAlbum'
import favouriteImage from 'app/data/mutations/images/favouriteImage'
import favouriteUser from 'app/data/mutations/users/favouriteUser'
import { useCurrentUser } from 'app/data/hooks/useCurrentUser'

export const useOptimisticFavourites = (
  item: (Album | Image | User) & {
    userFavourites: Array<{ id: string }>
  },
  mutationQuery:
    | typeof favouriteAlbum
    | typeof favouriteImage
    | typeof favouriteUser,
) => {
  const currentUser = useCurrentUser()
  const [favouriteMutation] = useMutation(mutationQuery)
  const [userHasLoved, setUserHasLoved] = useState(
    item.userFavourites?.some((user) => user.id === currentUser?.id) ?? false,
  )

  const setAlbumFavourite = () => {
    setUserHasLoved((prev) => {
      const newLoveState = !prev

      favouriteMutation(
        { id: item.id, unfavourite: userHasLoved },
        {
          onError() {
            setUserHasLoved(prev)
          },
        },
      )

      return newLoveState
    })
  }

  return [userHasLoved, setAlbumFavourite] as const
}
