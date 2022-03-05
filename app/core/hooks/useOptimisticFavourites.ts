import { useState } from "react"
import { useMutation } from "blitz"
import { Album, Image, User } from "@prisma/client"
import favouriteAlbum from "app/mutations/favouriteAlbum"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import favouriteImage from "app/mutations/favouriteImage"
import favouriteUser from "app/mutations/favouriteUser"

export const useOptimisticFavourites = (
  item: (Album | Image | User) & {
    userFavourites: Array<{ id: string }>
  },
  mutationQuery: typeof favouriteAlbum | typeof favouriteImage | typeof favouriteUser
) => {
  const currentUser = useCurrentUser()
  const [favouriteMutation] = useMutation(mutationQuery)
  const [userHasLoved, setUserHasLoved] = useState(
    item.userFavourites?.some((user) => user.id === currentUser?.id) ?? false
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
        }
      )

      return newLoveState
    })
  }

  return [userHasLoved, setAlbumFavourite] as const
}
