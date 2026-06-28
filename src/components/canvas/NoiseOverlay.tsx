import { useMemo, memo, useEffect } from 'react'
import { GLOBE_CONFIG } from '@/systems/rendererConfig'
import { createNoiseMaterial, shaderUniforms } from '@/shaders'

interface NoiseOverlayProps {
  scale?: number
  speed?: number
  intensity?: number
}

export const NoiseOverlay = memo(({
  scale     = 1.003,
  speed     = 0.25,
  intensity = 0.08,
}: NoiseOverlayProps) => {
  const material = useMemo(() => {
    const mat = createNoiseMaterial({
      speed,
      scale: 4.0,
      intensity,
      color: 0x2244aa,
    })
    shaderUniforms.registerTimed(mat)
    return mat
  }, [speed, intensity])

  useEffect(() => {
    return () => {
      shaderUniforms.unregisterTimed(material)
      material.dispose()
    }
  }, [material])

  return (
    <mesh scale={scale} renderOrder={1}>
      <sphereGeometry
        args={[GLOBE_CONFIG.radius, 48, 48]}
      />
      <primitive object={material} attach="material" />
    </mesh>
  )
})

NoiseOverlay.displayName = 'NoiseOverlay'
