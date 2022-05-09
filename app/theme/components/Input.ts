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
    },
    addon: {},
  },
  variants: {
    none: {
      field: {
        bg: 'transparent',
        _focus: {
          bg: 'ui.5',
          boxShadow: 'transparent',
        },
      },
    },
    default: {
      field: {
        bg: 'ui.5',
        rounded: 'md',
        _hover: {
          bg: 'ui.10',
        },
        _focus: {
          boxShadow: 'outline',
        },
      },
    },
  },
  sizes: {
    none: {
      field: {
        p: 2,
      },
    },
    default: {
      field: {
        p: 4,
      },
    },
  },
  defaultProps: {
    size: 'default',
    variant: 'default',
  },
}
