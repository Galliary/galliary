import { ComponentStyleConfig } from "@chakra-ui/react"

export const LinkStyle: ComponentStyleConfig = {
  baseStyle: {
    transitionProperty: "common",
    transitionDuration: "fast",
    transitionTimingFunction: "ease-out",
    cursor: "pointer",
    textDecoration: "none",
    outline: "none",
    color: "ui.40",
    _hover: {
      color: "brand.secondary.100",
      textDecoration: "none",
    },
    _focus: {
      boxShadow: "outline",
    },
  },
}
