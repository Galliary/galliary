import { menuAnatomy } from '@chakra-ui/anatomy'
import { MultiStyleConfig } from '@chakra-ui/theme-tools'

export const MenuStyle: MultiStyleConfig<typeof menuAnatomy> = {
  // Styles for the base style
  baseStyle: {
    list: {
      zIndex: 100,
      bg: 'background.full',
      p: 2,
      rounded: 'md',
    },
    item: {
      py: 2,
      px: 3,
      color: 'ui.60',
      rounded: 'sm',
      textStyle: 'label.medium',
      _hover: {
        bg: 'ui.5',
        color: 'ui.100',
      },
      _focus: {
        bg: 'ui.5',
        shadow: 'outline',
      },
    },
    button: {},
    command: {},
    divider: {},
    groupTitle: {},
  },
  // Styles for the size variations
  sizes: {},
  // Styles for the visual style variations
  variants: {},
  // The default `size` or `variant` values
  defaultProps: {},
}
