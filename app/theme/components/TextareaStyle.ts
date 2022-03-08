import { StyleConfig } from '@chakra-ui/theme-tools'

export const TextareaStyle: StyleConfig = {
  baseStyle: {
    bg: 'ui.5',
    p: 4,
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
  variants: {
    default: {
      bg: 'ui.5',
      rounded: 'md',
      _hover: {
        bg: 'ui.10',
      },
    },
  },
  sizes: {
    default: {
      p: 8,
    },
  },
  defaultProps: {
    size: 'default',
    variant: 'default',
  },
}
