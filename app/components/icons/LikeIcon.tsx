import { createIcon } from '@chakra-ui/icon'

export const LikeIcon = createIcon({
  displayName: 'LikeIcon',
  viewBox: '0 0 24 24',
  defaultProps: {
    fill: 'none',
    boxSize: 6,
  },
  path: (
    <>
      <path
        d="M13.12 2.06003L7.58 7.60003C7.21 7.97003 7 8.48003 7 9.01003V19C7 20.1 7.9 21 9 21H18C18.8 21 19.52 20.52 19.84 19.79L23.1 12.18C23.94 10.2 22.49 8.00003 20.34 8.00003H14.69L15.64 3.42003C15.74 2.92003 15.59 2.41003 15.23 2.05003C14.64 1.47003 13.7 1.47003 13.12 2.06003ZM3 21C4.1 21 5 20.1 5 19V11C5 9.90003 4.1 9.00003 3 9.00003C1.9 9.00003 1 9.90003 1 11V19C1 20.1 1.9 21 3 21Z"
        fill="currentColor"
      />
    </>
  ),
})
