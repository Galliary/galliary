import { ComponentStyleConfig } from "@chakra-ui/react"

export const LinkStyle: ComponentStyleConfig = {
  baseStyle: {
    transitionProperty: "common",
    transitionDuration: "fast",
    transitionTimingFunction: "ease-out",
    cursor: "pointer",
    textDecoration: "none",
    outline: "none",
    color: "inherit",
    _hover: {
      textDecoration: "none",
    },
    _focus: {
      boxShadow: "outline",
    },
  },
}
