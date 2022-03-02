import themeData from "./themes/dark.theme.json"
import { opacityForHex } from "../utils/hexOpacity"
import { ButtonStyle } from "./components/Button"
import { InputStyle } from "./components/Input"
import { LinkStyle } from "./components/Link"
import { transition } from "./transition"
import { textStyles } from "./textStyles"

export const DEFAULT_MODE = "dark"

const ui = opacityForHex(themeData.colors.ui)
const flow = opacityForHex(themeData.colors.flow)
const brandPrimary = opacityForHex(themeData.colors.brand.primary)
const brandSecondary = opacityForHex(themeData.colors.brand.secondary)

const rootStyles = {
  color: themeData.colors.ui,
  w: "full",
  minW: "full",
  h: "full",
  minH: "full",
  lineHeight: 1.25,
  fontFamily: "body",
  scrollBehavior: "smooth",
  textRendering: "optimizeLegibility",
  WebkitTapHighlightColor: "transparent",

  "::-webkit-scrollbar": {
    w: 1,
    h: 1,
  },

  "::-webkit-scrollbar-track": {
    background: "transparent",
  },

  "::-webkit-scrollbar-thumb": {
    cursor: "pointer",
    bg: "flow.20",
    rounded: "full",
    ":hover": {
      bg: "ui.80",
    },
  },
}

export const theme = {
  components: {
    Link: LinkStyle,
    Input: InputStyle,
    Button: ButtonStyle,
    Container: {
      baseStyle: {
        p: 0,
        w: "full",
        maxW: "container",
      },
    },
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1084px",
    xl: "1680px",
  },
  textStyles,
  transition,
  fonts: {
    heading: `'Style Script', cursive, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    body: `'Spartan', sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    mono: `SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`,
  },
  layerStyles: {
    panel: {
      bg: "ui.5",
      rounded: "md",
    },
  },
  config: {
    cssVarPrefix: "galliary",
    useSystemColorMode: true,
    initialColorMode: DEFAULT_MODE,
  },
  styles: {
    global: {
      _selection: {
        color: "brand.secondary.100",
        bg: "flow.100",
      },
      body: { ...rootStyles, bg: "transparent", width: "100vw" },
      html: {
        ...rootStyles,
        bg: "background.full",
        overflowY: "overlay",
      },
      "#__next": rootStyles,
      ':focus:not(:focus-visible):not([role="dialog"]):not([role="menu"])': { boxShadow: "none" },
    },
  },
  shadows: {
    outline: "0 0 0 2px var(--galliary-colors-brand-secondary-100)",
  },
  radii: themeData.radius,
  sizes: {
    half: "50%",
    full: "100%",
    ...themeData.sizes,
  },
  space: {
    half: "50%",
    full: "100%",
    ...themeData.sizes,
  },
  colors: {
    ...themeData.colors,
    brand: {
      primary: {
        100: brandPrimary(1),
        80: brandPrimary(0.8),
        60: brandPrimary(0.6),
        40: brandPrimary(0.4),
        20: brandPrimary(0.2),
        0: brandPrimary(0),
      },
      secondary: {
        100: brandSecondary(1),
        80: brandSecondary(0.8),
        60: brandSecondary(0.6),
        40: brandSecondary(0.4),
        20: brandSecondary(0.2),
        0: brandSecondary(0),
      },
    },
    flow: {
      100: flow(1),
      80: flow(0.8),
      60: flow(0.6),
      40: flow(0.4),
      20: flow(0.2),
      15: flow(0.15),
      10: flow(0.1),
      5: flow(0.05),
      "025": flow(0.025),
    },
    ui: {
      100: ui(1),
      80: ui(0.8),
      60: ui(0.6),
      40: ui(0.4),
      20: ui(0.2),
      15: ui(0.15),
      10: ui(0.1),
      5: ui(0.05),
      "025": ui(0.025),
    },
  },
} as const
