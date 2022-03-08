import { modalAnatomy } from '@chakra-ui/anatomy'
import { MultiStyleConfig } from '@chakra-ui/theme-tools'

export const ModalStyle: MultiStyleConfig<typeof modalAnatomy> = {
  // Styles for the base style
  baseStyle: {
    body: {
      p: 4,
      textStyle: 'paragraph.large',
      color: 'ui.60',
    },
    dialog: {
      maxW: '520px',
      bg: 'background.full',
      p: 2,
      rounded: 'md',
    },
    header: {
      p: 4,
      textStyle: 'heading.small',
    },
    footer: { p: 4 },
    overlay: {
      bg: 'overlay',
      zIndex: 1000,
    },
    closeButton: {
      top: 4,
      right: 4,
      boxSize: 10,
      pos: 'absolute',
      rounded: 'sm',
      _hover: {
        bg: 'ui.5',
      },
      transitionProperty: 'common',
      transitionDuration: 'normal',
    },
    dialogContainer: {
      d: 'flex',
      zIndex: 1001,
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  // Styles for the size variations
  sizes: {},
  // Styles for the visual style variations
  variants: {},
  // The default `size` or `variant` values
  defaultProps: {},
}
