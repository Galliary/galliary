import { IconProps } from '@chakra-ui/icon'
import { useLoggedIn } from 'app/data/hooks/useLoggedIn'
import { useOptimisticFavourites } from 'app/data/hooks/useOptimisticFavourites'
import { HeartIcon } from 'app/components/icons/HeartIcon'
import { Button } from '@chakra-ui/react'
import { MouseEventHandler, useMemo } from 'react'

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

  const onFavourite: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    e.preventDefault()
    updateFavourite()
  }

  const iconProps = useMemo(
    () =>
      userHasLoved
        ? {
            color: 'special.heart',
          }
        : {
            color: 'background.full',
          },
    [userHasLoved],
  )

  const styleProps = useMemo(() => style(userHasLoved), [userHasLoved])

  return useMemo(
    () =>
      !isLoggedIn ? null : (
        <Button
          size="none"
          variant="none"
          onClick={onFavourite}
          _focus={{
            '> svg': {
              strokeWidth: 2,
              stroke: 'brand.secondary.100',
            },
          }}
        >
          <HeartIcon
            boxSize={10}
            stroke="background.full"
            strokeWidth={2}
            cursor="pointer"
            transitionDuration="fast"
            transitionTimingFunction="ease"
            {...iconProps}
            {...styleProps}
          />
        </Button>
      ),
    [isLoggedIn, userHasLoved],
  )
}
