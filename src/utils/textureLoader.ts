import * as THREE from 'three'

const loader = new THREE.TextureLoader()
const cache = new Map<string, THREE.Texture>()

export interface TextureLoadConfig {
  url: string
  colorSpace?: THREE.ColorSpace
  anisotropy?: number
}

export function loadTexture(config: TextureLoadConfig): Promise<THREE.Texture> {
  const { url, colorSpace = THREE.NoColorSpace, anisotropy = 4 } = config

  const cached = cache.get(url)
  if (cached) return Promise.resolve(cached)

  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (texture) => {
        texture.colorSpace = colorSpace
        texture.minFilter = THREE.LinearMipmapLinearFilter
        texture.magFilter = THREE.LinearFilter
        texture.anisotropy = anisotropy
        texture.needsUpdate = true
        cache.set(url, texture)
        resolve(texture)
      },
      undefined,
      (err) => reject(err),
    )
  })
}

export function disposeTextureCache(): void {
  cache.forEach((t) => t.dispose())
  cache.clear()
}
