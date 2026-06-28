// Textures sourced from NASA Visible Earth and Three.js example assets (public domain).
// See README for full attribution.
const THREE_TEXTURES =
  'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets'

export const TEXTURE_URLS = {
  // Blue Marble day surface
  earthDay: `${THREE_TEXTURES}/earth_atmos_2048.jpg`,
  // Normal map for terrain relief
  earthNormal: `${THREE_TEXTURES}/earth_normal_2048.jpg`,
  // Ocean specular (white = reflective water, black = matte land)
  earthSpecular: `${THREE_TEXTURES}/earth_specular_2048.jpg`,
  // City lights for dark side
  earthNight: `${THREE_TEXTURES}/earth_lights_2048.png`,
  // Cloud alpha map
  earthClouds: `${THREE_TEXTURES}/earth_clouds_1024.png`,
} as const

export type TextureKey = keyof typeof TEXTURE_URLS
