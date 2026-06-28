import { useMemo, memo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import type { EarthTextures } from '@/hooks/useEarthTextures'

interface EarthMaterialProps {
  textures: EarthTextures
  sunPosition: THREE.Vector3
}

/**
 * Uses MeshPhongMaterial for day surface, specular ocean reflections, and
 * normal-mapped terrain. Night lights are composited via a second pass mesh
 * rendered in the Earth component — this material handles the lit hemisphere.
 */
export const EarthMaterial = memo(({ textures, sunPosition }: EarthMaterialProps) => {
  const matRef = useRef<THREE.MeshPhongMaterial>(null)

  const material = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        map: textures.earthDay,
        normalMap: textures.earthNormal,
        normalScale: new THREE.Vector2(6, 6),
        specularMap: textures.earthSpecular,
        specular: new THREE.Color(0x333333),
        shininess: 15,
      }),
    [textures],
  )

  // Keep sun direction in sync each frame (directional light may animate)
  useFrame(() => {
    if (!matRef.current) return
    matRef.current.needsUpdate = false
    // Phong handles lighting automatically via Three's light system
    void sunPosition
  })

  return <primitive ref={matRef} object={material} attach="material" />
})

EarthMaterial.displayName = 'EarthMaterial'
