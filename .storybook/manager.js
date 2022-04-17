import { addons } from '@storybook/addons'
import { themes } from '@storybook/theming'

addons.setConfig({ showRoots: true })
addons.setConfig({
  theme: themes.dark,
  panelPosition: 'bottom',
})
