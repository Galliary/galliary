import { SupportedLocales } from "types"

export const translations = {
  title: {
    [SupportedLocales.English]: "Are you sure?",
  },
  body_0: {
    [SupportedLocales.English]: "Are you sure you want to delete this album?",
  },
  body_1: {
    [SupportedLocales.English]: "This will also delete all the images inside the album.",
  },
  confirm: {
    [SupportedLocales.English]: "Delete Album",
  },
  cancel: {
    [SupportedLocales.English]: "Never mind",
  },
} as const
