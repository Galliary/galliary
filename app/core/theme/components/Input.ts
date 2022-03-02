import { inputAnatomy } from "@chakra-ui/anatomy"
import { ComponentMultiStyleConfig } from "@chakra-ui/react"

export const InputStyle: ComponentMultiStyleConfig = {
  parts: inputAnatomy.keys,
  baseStyle: {
    field: {
      width: "100%",
      minWidth: 0,
      outline: 0,
      position: "relative",
      appearance: "none",
      transitionProperty: "common",
      transitionDuration: "normal",
      _focus: {
        boxShadow: "outline",
      },
    },
    addon: {},
  },
  variants: {
    default: {
      field: {
        bg: "ui.5",
        rounded: "md",
      },
    },
  },
  sizes: {
    default: {
      field: {
        p: 4,
      },
    },
  },
  defaultProps: {
    size: "default",
    variant: "default",
  },
}
