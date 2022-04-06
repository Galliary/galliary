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
          },
    [userHasLoved],
  )

  const styleProps = useMemo(() => style(userHasLoved), [userHasLoved])

  const focus = useMemo(
    () => ({
      '> svg': {
        strokeWidth: 2,
        stroke: userHasLoved ? 'background.full' : 'special.heart',
      },
    }),
    [userHasLoved],
  )

  const render = useMemo(
    () =>
      !isLoggedIn ? null : (
        <Button
          aria-label="Favourite"
          size="none"
          variant="none"
          onClick={onFavourite}
          _focus={focus}
        >
          <HeartIcon
            boxSize={10}
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

  return render
}
