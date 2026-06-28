import { useRef, useMemo, memo, useEffect } from 'react'
import * as THREE from 'three'
import { GLOBE_CONFIG } from '@/systems/rendererConfig'
import { createGlowMaterial } from '@/shaders'
import type { GlowMaterialOptions } from '@/shaders'

interface GlowRingProps {
  scale?: number
  options?: GlowMaterialOptions
}

export const GlowRing = memo(({ scale = 1.12, options = {} }: GlowRingProps) => {
  const meshRef = useRef<THREE.Mesh>(null)

  const material = useMemo(
    () => createGlowMaterial({ color: 0x1a5599, intensity: 0.45, falloff: 5.0, ...options }),
    [options],
  )

  useEffect(() => () => material.dispose(), [material])

  return (
    <mesh ref={meshRef} scale={scale} renderOrder={2}>
      <sphereGeometry
        args={[GLOBE_CONFIG.radius, GLOBE_CONFIG.widthSegments, GLOBE_CONFIG.heightSegments]}
      />
      <primitive object={material} attach="material" />
    </mesh>
  )
})

GlowRing.displayName = 'GlowRing'
