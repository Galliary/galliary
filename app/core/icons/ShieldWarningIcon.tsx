import { createIcon } from "@chakra-ui/icon"

export const ShieldWarningIcon = createIcon({
  displayName: "ShieldWarningIcon",
  viewBox: "0 0 24 24",
  defaultProps: {
    fill: "none",
  },
  path: (
    <>
      <path
        d="M4.19 4.47C3.47 4.79 3 5.51 3 6.3V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V6.3C21 5.51 20.53 4.79 19.81 4.47L12.81 1.36C12.29 1.13 11.7 1.13 11.19 1.36L4.19 4.47ZM12 7C12.55 7 13 7.45 13 8C13 8.55 12.55 9 12 9C11.45 9 11 8.55 11 8C11 7.45 11.45 7 12 7ZM12 11C12.55 11 13 11.45 13 12V16C13 16.55 12.55 17 12 17C11.45 17 11 16.55 11 16V12C11 11.45 11.45 11 12 11Z"
        fill="currentColor"
      />
    </>
  ),
})
