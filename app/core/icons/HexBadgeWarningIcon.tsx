import { createIcon } from "@chakra-ui/icon"

export const HexBadgeWarningIcon = createIcon({
  displayName: "HexBadgeWarningIcon",
  viewBox: "0 0 24 24",
  defaultProps: {
    fill: "none",
  },
  path: (
    <>
      <path
        d="M15.32 3H8.68C8.42 3 8.16 3.11 7.98 3.29L3.29 7.98C3.11 8.16 3 8.42 3 8.68V15.31C3 15.58 3.11 15.83 3.29 16.02L7.97 20.7C8.16 20.89 8.42 21 8.68 21H15.31C15.58 21 15.83 20.89 16.02 20.71L20.7 16.03C20.89 15.84 20.99 15.59 20.99 15.32V8.68C20.99 8.41 20.88 8.16 20.7 7.97L16.02 3.29C15.84 3.11 15.58 3 15.32 3ZM12 17.3C11.28 17.3 10.7 16.72 10.7 16C10.7 15.28 11.28 14.7 12 14.7C12.72 14.7 13.3 15.28 13.3 16C13.3 16.72 12.72 17.3 12 17.3ZM12 13C11.45 13 11 12.55 11 12V8C11 7.45 11.45 7 12 7C12.55 7 13 7.45 13 8V12C13 12.55 12.55 13 12 13Z"
        fill="currentColor"
      />
    </>
  ),
})
