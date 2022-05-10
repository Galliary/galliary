import { useState } from 'react'
import { useCurrentUser } from 'app/data/hooks/useCurrentUser'
import {
  FavouriteAlbumMutationFn,
  FavouriteImageMutationFn,
  FavouriteUserMutationFn,
} from 'generated/graphql.client'
import { Maybe } from 'global'

export const useOptimisticFavourites = (
  item: { id: string; userFavourites?: Maybe<Array<{ id: string }>> },
  mutation:
    | FavouriteImageMutationFn
    | FavouriteAlbumMutationFn
    | FavouriteUserMutationFn,
) => {
  const currentUser = useCurrentUser()
  const [userHasLoved, setUserHasLoved] = useState(
    item.userFavourites?.some((u) => u.id === currentUser?.id) ?? false,
  )

  const setAlbumFavourite = () => {
    setUserHasLoved((prev) => {
      const newLoveState = !prev

      mutation({
        onError(error) {
          setUserHasLoved(prev)
        },
        variables: { id: item.id, unfavourite: userHasLoved },
      })

      return newLoveState
    })
  }

  return [userHasLoved, setAlbumFavourite] as const
}
