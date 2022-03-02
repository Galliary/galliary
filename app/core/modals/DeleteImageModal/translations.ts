import { SupportedLocales } from "types"

export const translations = {
  title: {
    [SupportedLocales.English]: "Are you sure?",
  },
  body_0: {
    [SupportedLocales.English]: "Are you sure you want to delete this image?",
  },
  body_1: {
    [SupportedLocales.English]: "This action cannot be undone.",
  },
  confirm: {
    [SupportedLocales.English]: "Delete Image",
  },
  cancel: {
    [SupportedLocales.English]: "Never mind",
  },
} as const
