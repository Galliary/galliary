import { createIcon } from '@chakra-ui/icon'

export const InvertCircleCornerIcon = createIcon({
  displayName: 'InvertCircleCornerIcon',
  viewBox: '0 0 40 40',
  defaultProps: {
    boxSize: 10,
    fill: 'none',
  },
  path: (
    <>
      <path
        d="M0 0V40C6.68607 13.8344 15.5732 5.23759 40 0H0Z"
        fill="currentColor"
      />
    </>
  ),
})
