import { useMemo, memo } from 'react'
import * as THREE from 'three'
import { GLOBE_CONFIG, LIGHTING_CONFIG } from '@/systems/rendererConfig'
import { EarthMaterial } from '@/components/canvas/EarthMaterial'
import type { EarthTextures } from '@/hooks/useEarthTextures'

interface EarthProps {
  textures: EarthTextures
}

const SPHERE_ARGS: [number, number, number] = [
  GLOBE_CONFIG.radius,
  GLOBE_CONFIG.widthSegments,
  GLOBE_CONFIG.heightSegments,
]

export const Earth = memo(({ textures }: EarthProps) => {
  const sunPosition = useMemo(
    () => new THREE.Vector3(...LIGHTING_CONFIG.directional.position).normalize(),
    [],
  )

  const nightMaterial = useMemo(
    () =>
      new THREE.MeshLambertMaterial({
        map: textures.earthNight,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 1,
        depthWrite: false,
      }),
    [textures.earthNight],
  )

  return (
    <group>
      {/* Day surface */}
      <mesh castShadow receiveShadow renderOrder={0}>
        <sphereGeometry args={SPHERE_ARGS} />
        <EarthMaterial textures={textures} sunPosition={sunPosition} />
      </mesh>

      {/* Night lights — additive blend, visible only on dark hemisphere */}
      <mesh renderOrder={1}>
        <sphereGeometry args={SPHERE_ARGS} />
        <primitive object={nightMaterial} attach="material" />
      </mesh>
    </group>
  )
})

Earth.displayName = 'Earth'
