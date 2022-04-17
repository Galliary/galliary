import { Meta } from '@storybook/react'
import { Tooltip } from 'app/components/Tooltip'
import { Button } from '@chakra-ui/react'

const _Meta: Meta = {
  title: 'Utilities/Tooltip',
  component: Tooltip,
}

export const _Tooltip = () => (
  <Tooltip label="Tooltip Label :)">
    <Button variant="primary">Hover me!</Button>
  </Tooltip>
)

export default _Meta
