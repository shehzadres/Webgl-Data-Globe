import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { loadTexture } from '@/utils/textureLoader'
import { TEXTURE_URLS, type TextureKey } from '@/data/textureUrls'

export interface EarthTextures {
  earthDay: THREE.Texture
  earthNormal: THREE.Texture
  earthSpecular: THREE.Texture
  earthNight: THREE.Texture
  earthClouds: THREE.Texture
}

interface UseEarthTexturesResult {
  textures: EarthTextures | null
  isLoading: boolean
  progress: number
  error: string | null
}

const COLOR_SPACE_KEYS: ReadonlySet<TextureKey> = new Set(['earthDay', 'earthNight'])

export function useEarthTextures(): UseEarthTexturesResult {
  const [textures, setTextures] = useState<EarthTextures | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true
    let loaded = 0

    const entries = Object.entries(TEXTURE_URLS) as [TextureKey, string][]

    const promises = entries.map(([key, url]) =>
      loadTexture({
        url,
        colorSpace: COLOR_SPACE_KEYS.has(key) ? THREE.SRGBColorSpace : THREE.NoColorSpace,
        anisotropy: 4,
      }).then((texture) => {
        loaded++
        if (mounted.current) setProgress(loaded / entries.length)
        return [key, texture] as [TextureKey, THREE.Texture]
      }),
    )

    Promise.all(promises)
      .then((results) => {
        if (!mounted.current) return
        setTextures(Object.fromEntries(results) as unknown as EarthTextures)
        setIsLoading(false)
      })
      .catch((err: unknown) => {
        if (!mounted.current) return
        setError(err instanceof Error ? err.message : 'Texture load failed')
        setIsLoading(false)
      })

    return () => {
      mounted.current = false
    }
  }, [])

  return { textures, isLoading, progress, error }
}
