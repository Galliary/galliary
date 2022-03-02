import { createIcon } from "@chakra-ui/icon"

export const UploadIcon = createIcon({
  displayName: "UploadIcon",
  viewBox: "0 0 24 24",
  defaultProps: {
    fill: "none",
    boxSize: 6,
  },
  path: (
    <>
      <path
        d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04ZM14 13V17H10V13H7L11.65 8.35C11.85 8.15 12.16 8.15 12.36 8.35L17 13H14Z"
        fill="currentColor"
      />
    </>
  ),
})
