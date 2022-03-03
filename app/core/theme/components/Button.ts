import { ComponentStyleConfig } from "@chakra-ui/react"

export const ButtonStyle: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "md",
    transitionProperty: "common",
    transitionDuration: "normal",
    _focus: {
      shadow: "outline",
    },
    textStyle: "label.medium",
  },
  variants: {
    none: {},
    default: {
      color: "ui.80",
      bg: "ui.5",
      _hover: {
        color: "ui.100",
        bg: "ui.10",
      },
    },
    bad: {
      fontWeight: "bold",
      color: "flow.100",
      bg: "status.bad",
      _hover: {
        opacity: 0.8,
      },
    },
    primary: {
      fontWeight: "bold",
      color: "flow.100",
      bg: "brand.primary.100",
      _hover: {
        bg: "brand.primary.80",
      },
    },
  },
  sizes: {
    none: {},
    default: {
      py: 3,
      px: 6,
    },
  },
  defaultProps: {
    size: "default",
    variant: "default",
  },
}
