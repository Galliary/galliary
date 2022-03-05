import { HeartIcon } from "app/core/icons/HeartIcon"
import { useOptimisticFavourites } from "app/core/hooks/useOptimisticFavourites"
import { IconProps } from "@chakra-ui/icon"
import { Tooltip } from "app/core/components/Tooltip"
import { useLoggedIn } from "app/core/hooks/useLoggedIn"

type UseOptimisticFavouritesParams = Parameters<typeof useOptimisticFavourites>

interface FavouriteProps {
  item: UseOptimisticFavouritesParams[0]
  mutation: UseOptimisticFavouritesParams[1]
  style?: (isActive: boolean) => IconProps
}

export const Favourite = ({ item, mutation, style = () => ({}) }: FavouriteProps) => {
  const isLoggedIn = useLoggedIn()
  const [userHasLoved, updateFavourite] = useOptimisticFavourites(item, mutation)

  return !isLoggedIn ? null : (
    <Tooltip label="Favourite">
      <HeartIcon
        boxSize={10}
        strokeWidth={2}
        cursor="pointer"
        transitionDuration="fast"
        transitionTimingFunction="ease"
        {...(userHasLoved
          ? {
              color: "special.heart",
              _hover: {
                opacity: 0.8,
              },
              stroke: "special.heart",
            }
          : {
              color: "transparent",
              _hover: {
                color: "special.heart",
              },
              stroke: "background.full",
            })}
        {...style(userHasLoved)}
        onClick={updateFavourite}
      />
    </Tooltip>
  )
}
