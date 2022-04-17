import { createIcon } from '@chakra-ui/icon'

export const UploadIcon = createIcon({
  displayName: 'UploadIcon',
  viewBox: '0 0 24 24',
  defaultProps: {
    fill: 'none',
    boxSize: 6,
  },
  path: (
    <>
      <path
        d="M10 16H14C14.55 16 15 15.55 15 15V9.99997H16.59C17.48 9.99997 17.93 8.91997 17.3 8.28997L12.71 3.69997C12.32 3.30997 11.69 3.30997 11.3 3.69997L6.71 8.28997C6.08 8.91997 6.52 9.99997 7.41 9.99997H9V15C9 15.55 9.45 16 10 16ZM6 18H18C18.55 18 19 18.45 19 19C19 19.55 18.55 20 18 20H6C5.45 20 5 19.55 5 19C5 18.45 5.45 18 6 18Z"
        fill="currentColor"
      />
    </>
  ),
})
