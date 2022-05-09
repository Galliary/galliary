import omit from 'lodash/omit'
import pick from 'lodash/pick'

// eslint-disable-next-line no-restricted-imports
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link'

// eslint-disable-next-line no-restricted-imports
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/layout'
import { forwardRef } from '@chakra-ui/system'

export type LinkProps = Omit<
  Omit<NextLinkProps, 'passHref' | 'as'> & {
    linkAs?: NextLinkProps['as']
  } & ChakraLinkProps,
  'href'
> & { href: NextLinkProps['href'] }

const nextLinkProps = [
  'href',
  'replace',
  'shallow',
  'prefetch',
  'locale',
] as const

export const Link = forwardRef<LinkProps, typeof ChakraLink>(
  ({ linkAs, ...props }, ref) => {
    const linkProps = pick(props, nextLinkProps)
    const chakraProps = omit<LinkProps, keyof LinkProps>(props, nextLinkProps)

    return (
      <NextLink {...linkProps} as={linkAs} passHref>
        <ChakraLink {...chakraProps} ref={ref} />
      </NextLink>
    )
  },
)
