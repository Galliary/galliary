import { inputAnatomy } from '@chakra-ui/anatomy'
import { ComponentMultiStyleConfig } from '@chakra-ui/react'

export const InputStyle: ComponentMultiStyleConfig = {
  parts: inputAnatomy.keys,
  baseStyle: {
    field: {
      width: '100%',
      minWidth: 0,
      outline: 0,
      position: 'relative',
      appearance: 'none',
      transitionProperty: 'common',
      transitionDuration: 'normal',
      textStyle: 'paragraph.large',
      _focus: {
        boxShadow: 'outline',
      },
    },
    addon: {},
  },
  variants: {
    default: {
      field: {
        bg: 'ui.5',
        rounded: 'md',
        _hover: {
          bg: 'ui.10',
        },
      },
    },
  },
  sizes: {
    default: {
      field: {
        p: 8,
      },
    },
  },
  defaultProps: {
    size: 'default',
    variant: 'default',
  },
}
