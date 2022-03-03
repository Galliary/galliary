import { createIcon } from "@chakra-ui/icon"

export const LongDragIcon = createIcon({
  displayName: "LongDragIcon",
  viewBox: "0 0 24 24",
  defaultProps: {
    h: "14px",
    w: "49px",
    fill: "none",
  },
  path: (
    <>
      <path
        d="M1 14H48C48.55 14 49 13.55 49 13V9C49 8.45 48.55 8 48 8H1C0.45 8 0 8.45 0 9V13C0 13.55 0.45 14 1 14ZM1 6H48C48.55 6 49 5.55 49 5C49 4.45 48.55 4 48 4H1C0.45 4 0 4.45 0 5C0 5.55 0.45 6 1 6ZM0 1C0 1.55 0.45 2 1 2H48C48.55 2 49 1.55 49 1C49 0.45 48.55 0 48 0L1 0C0.45 0 0 0.45 0 1Z"
        fill="currentColor"
      />
    </>
  ),
})
