import { memo, ReactNode, useMemo } from 'react'
import { Image as BlitzImage, ImageProps as BlitzImageProps } from 'blitz'
import {
  Box,
  BoxProps,
  Center,
  forwardRef,
  Skeleton,
  Text,
  useBoolean,
} from '@chakra-ui/react'

type CustomImageProps = {
  src: string
  fallback?: ReactNode
  fallbackSrc?: string
  name?: string
  onLoadComplete?(): void
}

export type ImageProps = CustomImageProps &
  Omit<
    BoxProps,
    'as' | 'src' | 'boxSize' | 'h' | 'w' | 'width' | 'height' | 'fallbackSrc'
  > &
  Omit<BlitzImageProps, 'style' | 'ref' | 'src'>

// Includes support for stringified numbers
const appendPxToNumber = (str?: string | number) =>
  !isNaN(Number(str)) ? `${str}px` : str
const stripPxString = (str?: string | number) => String(str).replace('px', '')

function getInitials(name: string) {
  const [firstName, lastName] = name.split(' ')
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName?.charAt(0)
}

export const Image = memo(
  forwardRef<ImageProps, typeof Box>(
    (
      {
        src,
        name,
        alt,
        width,
        height,
        loading,
        fallback,
        fallbackSrc,
        onLoadComplete: _onLoadComplete = () => {},
        ...props
      },
      ref,
    ) => {
      const [isLoaded, setIsLoaded] = useBoolean(false)
      const [hasErrored, setHasErrored] = useBoolean(false)

      const w = useMemo(() => appendPxToNumber(width), [width])
      const h = useMemo(() => appendPxToNumber(height), [height])
      const imgWidth = useMemo(() => stripPxString(width), [width])
      const imgHeight = useMemo(() => stripPxString(height), [height])

      const isVisible = isLoaded || hasErrored

      const placeholder = useMemo(
        () => (
          <Center boxSize="full" bg="brand.100">
            <Text textStyle="heading.sm" color="flow.100">
              {getInitials(name ?? '')}
            </Text>
          </Center>
        ),
        [name],
      )

      const boxProps = {
        ...props,
      } as const

      const onLoadComplete = () => {
        _onLoadComplete()
        setIsLoaded.on()
      }

      return (
        <Skeleton {...boxProps} isLoaded={isVisible}>
          <Center
            overflow="hidden"
            {...boxProps}
            bg="ui.5"
            w={w}
            h={h}
            ref={ref}
          >
            {hasErrored ? (
              fallback ?? placeholder
            ) : (
              <BlitzImage
                alt={alt}
                src={src ?? fallbackSrc}
                width={imgWidth}
                height={imgHeight}
                objectFit="cover"
                loading={loading}
                onLoad={onLoadComplete}
                onLoadingComplete={onLoadComplete}
                onError={setHasErrored.on}
              />
            )}
          </Center>
        </Skeleton>
      )
    },
  ),
)
