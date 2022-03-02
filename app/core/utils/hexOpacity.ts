export const opacity = (hex: string, opac: number): string => {
  if (!/^#([A-Fa-f0-9]{3}$|[A-Fa-f0-9]{6}$|[A-Fa-f0-9]{8}$)/.test(hex)) {
    throw new Error("Invalid hexadecimal color value")
  }

  if (opac > 1 || opac < 0) {
    throw new Error("Opacity should be float between 0 - 1")
  }

  let color = hex.substring(1)
  if (color.length === 8) {
    color = color.substring(0, color.length - 2)
  }

  if (color[0] && color.length === 3) {
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2]
  }

  color += Math.round(opac * 255)
    .toString(16)
    .padStart(2, "0")

  return `#${color}`.toUpperCase()
}

export const opacityForHex = (hex: string) => (opac: number) => opacity(hex, opac)
