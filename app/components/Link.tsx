import omit from "lodash/omit"
import pick from "lodash/pick"

// eslint-disable-next-line no-restricted-imports
import { Link as BlitzLink, LinkProps as BlitzLinkProps } from "blitz"

// eslint-disable-next-line no-restricted-imports
import { forwardRef, Link as ChakraLink, LinkProps as ChakraLinkProps } from "@chakra-ui/react"

export type LinkProps = Omit<
  Omit<BlitzLinkProps, "passHref" | "as"> & {
    linkAs?: BlitzLinkProps["as"]
  } & ChakraLinkProps,
  "href"
> & { href: BlitzLinkProps["href"] }

const blitzLinkProps = ["href", "replace", "shallow", "prefetch", "locale"] as const

export const Link = forwardRef<LinkProps, typeof ChakraLink>(({ linkAs, ...props }, ref) => {
  const linkProps = pick(props, blitzLinkProps)
  const chakraProps = omit<LinkProps, keyof LinkProps>(props, blitzLinkProps)

  return (
    <BlitzLink {...linkProps} as={linkAs} passHref>
      <ChakraLink {...chakraProps} ref={ref} />
    </BlitzLink>
  )
})
