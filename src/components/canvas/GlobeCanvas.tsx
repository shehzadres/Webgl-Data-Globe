import { memo, Suspense, type CSSProperties } from 'react'
import { Canvas } from '@react-three/fiber'
import { Scene } from '@/components/canvas/Scene'
import { CAMERA_CONFIG, RENDERER_CONFIG, SCENE_CONFIG } from '@/systems/rendererConfig'
import * as THREE from 'three'

interface GlobeCanvasProps {
  className?: string
  style?: CSSProperties
}

export const GlobeCanvas = memo(({ className, style }: GlobeCanvasProps) => {
  return (
    <Canvas
      className={className}
      style={style}
      camera={{
        fov: CAMERA_CONFIG.fov,
        near: CAMERA_CONFIG.near,
        far: CAMERA_CONFIG.far,
        position: CAMERA_CONFIG.initialPosition,
      }}
      gl={{
        antialias: RENDERER_CONFIG.antialias,
        alpha: RENDERER_CONFIG.alpha,
        powerPreference: RENDERER_CONFIG.powerPreference,
        toneMapping: RENDERER_CONFIG.toneMapping,
        toneMappingExposure: RENDERER_CONFIG.toneMappingExposure,
        outputColorSpace: RENDERER_CONFIG.outputColorSpace,
      }}
      shadows={{
        enabled: RENDERER_CONFIG.shadowMapEnabled,
        type: RENDERER_CONFIG.shadowMapType,
      }}
      dpr={[1, Math.min(window.devicePixelRatio, 2)]}
      scene={{ background: new THREE.Color(SCENE_CONFIG.background) }}
      performance={{ min: 0.5 }}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
})

GlobeCanvas.displayName = 'GlobeCanvas'
