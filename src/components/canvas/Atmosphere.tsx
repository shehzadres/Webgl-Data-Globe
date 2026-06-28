import { useRef, useMemo, memo, useEffect } from 'react'
import * as THREE from 'three'
import { GLOBE_CONFIG } from '@/systems/rendererConfig'
import { createAtmosphereMaterial } from "@/shaders"

const ATMOSPHERE_SCALE = 1.06

const SPHERE_ARGS: [number, number, number] = [
  GLOBE_CONFIG.radius * ATMOSPHERE_SCALE,
  GLOBE_CONFIG.widthSegments,
  GLOBE_CONFIG.heightSegments,
]

interface AtmosphereProps {
  intensity?: number
  falloff?: number
}

export const Atmosphere = memo(({ intensity = 0.85, falloff = 3.5 }: AtmosphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null)

  const material = useMemo(() => {
    const mat = createAtmosphereMaterial()
    mat.uniforms.uIntensity.value = intensity
    mat.uniforms.uFalloff.value   = falloff
    return mat
  }, [intensity, falloff])

  // Register for uTime ticks (atmosphere has no time uniform currently, but
  // this is the hook point for future animated scatter effects)
  useEffect(() => {
    return () => {
      material.dispose()
    }
  }, [material])

  return (
    <mesh ref={meshRef} renderOrder={3}>
      <sphereGeometry args={SPHERE_ARGS} />
      <primitive object={material} attach="material" />
    </mesh>
  )
})

Atmosphere.displayName = 'Atmosphere'

