import { createIcon } from "@chakra-ui/icon"

export const HeartIcon = createIcon({
  displayName: "HeartIcon",
  viewBox: "0 0 24 24",
  defaultProps: {
    fill: "none",
    boxSize: 6,
  },
  path: (
    <>
      <path
        d="M13.35 20.13C12.59 20.82 11.42 20.82 10.66 20.12L10.55 20.02C5.29997 15.27 1.86997 12.16 1.99997 8.27998C2.05997 6.57998 2.92997 4.94998 4.33997 3.98998C6.97997 2.18998 10.24 3.02998 12 5.08998C13.76 3.02998 17.02 2.17998 19.66 3.98998C21.07 4.94998 21.94 6.57998 22 8.27998C22.14 12.16 18.7 15.27 13.45 20.04L13.35 20.13Z"
        fill="currentColor"
      />
    </>
  ),
})
