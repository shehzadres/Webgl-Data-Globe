import { memo } from 'react'
import { LIGHTING_CONFIG } from '@/systems/rendererConfig'

export const SceneLighting = memo(() => {
  return (
    <>
      {/* Low ambient keeps the dark side from going pitch black */}
      <ambientLight
        color={LIGHTING_CONFIG.ambient.color}
        intensity={LIGHTING_CONFIG.ambient.intensity}
      />

      {/* Primary sun — casts shadows, drives Phong specular */}
      <directionalLight
        color={LIGHTING_CONFIG.directional.color}
        intensity={LIGHTING_CONFIG.directional.intensity}
        position={LIGHTING_CONFIG.directional.position}
        castShadow={LIGHTING_CONFIG.directional.castShadow}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-bias={-0.0001}
      />

      {/* Cool fill light from opposite side — simulates Earth-shine */}
      <pointLight
        color={LIGHTING_CONFIG.fill.color}
        intensity={LIGHTING_CONFIG.fill.intensity}
        position={LIGHTING_CONFIG.fill.position}
      />
    </>
  )
})

SceneLighting.displayName = 'SceneLighting'
