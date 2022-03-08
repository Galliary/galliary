import { IconProps } from '@chakra-ui/icon'
import { useLoggedIn } from 'app/data/hooks/useLoggedIn'
import { useOptimisticFavourites } from 'app/data/hooks/useOptimisticFavourites'
import { HeartIcon } from 'app/components/icons/HeartIcon'

type UseOptimisticFavouritesParams = Parameters<typeof useOptimisticFavourites>

interface FavouriteProps {
  item: UseOptimisticFavouritesParams[0]
  mutation: UseOptimisticFavouritesParams[1]
  style?: (isActive: boolean) => IconProps
}

export const Favourite = ({
  item,
  mutation,
  style = () => ({}),
}: FavouriteProps) => {
  const isLoggedIn = useLoggedIn()
  const [userHasLoved, updateFavourite] = useOptimisticFavourites(
    item,
    mutation,
  )

  return !isLoggedIn ? null : (
    <HeartIcon
      boxSize={10}
      strokeWidth={2}
      cursor="pointer"
      transitionDuration="fast"
      transitionTimingFunction="ease"
      {...(userHasLoved
        ? {
            color: 'special.heart',
            _hover: {
              opacity: 0.8,
            },
            stroke: 'special.heart',
          }
        : {
            color: 'background.full',
            _hover: {
              color: 'special.heart',
            },
            stroke: 'background.full',
          })}
      {...style(userHasLoved)}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        updateFavourite()
      }}
    />
  )
}
