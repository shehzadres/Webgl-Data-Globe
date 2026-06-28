import { useRef, useMemo, memo } from 'react'
import * as THREE from 'three'
import { useAnimationLoop } from '@/hooks/useAnimationLoop'
import { GLOBE_CONFIG } from '@/systems/rendererConfig'
import type { EarthTextures } from '@/hooks/useEarthTextures'

interface CloudLayerProps {
  textures: EarthTextures
}

// Clouds rotate slowly on their own — independent of camera orbit
const CLOUD_RADIUS_FACTOR = 1.007
const CLOUD_ROTATION_SPEED = 0.012 // radians per second

const SPHERE_ARGS: [number, number, number] = [
  GLOBE_CONFIG.radius * CLOUD_RADIUS_FACTOR,
  GLOBE_CONFIG.widthSegments,
  GLOBE_CONFIG.heightSegments,
]

export const CloudLayer = memo(({ textures }: CloudLayerProps) => {
  const meshRef = useRef<THREE.Mesh>(null)

  const material = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        map: textures.earthClouds,
        alphaMap: textures.earthClouds,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        side: THREE.FrontSide,
      }),
    [textures.earthClouds],
  )

  useAnimationLoop((_state, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += CLOUD_ROTATION_SPEED * delta
  })

  return (
    <mesh ref={meshRef} renderOrder={2}>
      <sphereGeometry args={SPHERE_ARGS} />
      <primitive object={material} attach="material" />
    </mesh>
  )
})

CloudLayer.displayName = 'CloudLayer'
