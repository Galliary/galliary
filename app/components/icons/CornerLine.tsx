import { createIcon } from '@chakra-ui/icon'

export const CornerLine = createIcon({
  displayName: 'CornerLine',
  viewBox: '0 0 24 24',
  defaultProps: {
    fill: 'none',
    boxSize: 6,
  },
  path: (
    <>
      <path
        d="M12 3C12 12 12 12 21 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})
