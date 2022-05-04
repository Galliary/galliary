import { useState } from 'react'
import { useCurrentUser } from 'app/data/hooks/useCurrentUser'
import {
  FavouriteAlbumMutationFn,
  FavouriteImageMutationFn,
  FavouriteUserMutationFn,
} from 'generated/graphql'
import { Maybe } from 'global'

export const useOptimisticFavourites = (
  item: { id: string; userFavouritesIds?: Maybe<string[]> },
  mutation:
    | FavouriteImageMutationFn
    | FavouriteAlbumMutationFn
    | FavouriteUserMutationFn,
) => {
  const currentUser = useCurrentUser()
  const [userHasLoved, setUserHasLoved] = useState(
    item.userFavouritesIds?.some((userId) => userId === currentUser?.id) ??
      false,
  )

  const setAlbumFavourite = () => {
    setUserHasLoved((prev) => {
      const newLoveState = !prev

      mutation({
        onError() {
          setUserHasLoved(prev)
        },
        variables: { id: item.id, unfavourite: userHasLoved },
      })

      return newLoveState
    })
  }

  return [userHasLoved, setAlbumFavourite] as const
}
