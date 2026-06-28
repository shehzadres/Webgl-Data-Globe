import * as THREE from 'three'

export const RENDERER_CONFIG = {
  antialias: true,
  alpha: false,
  powerPreference: 'high-performance' as const,
  toneMapping: THREE.ACESFilmicToneMapping,
  toneMappingExposure: 1.1,
  outputColorSpace: THREE.SRGBColorSpace,
  shadowMapType: THREE.PCFSoftShadowMap,
  shadowMapEnabled: true,
} as const

export const CAMERA_CONFIG = {
  fov: 45,
  near: 0.1,
  far: 1000,
  // R3F initial position — overridden immediately by CameraRig on first frame
  initialPosition: [0, 0, 3.5] as [number, number, number],
} as const

export const LIGHTING_CONFIG = {
  ambient: {
    color: '#ffffff',
    intensity: 0.08,
  },
  directional: {
    color: '#fff5e6',
    intensity: 3.0,
    position: [5, 3, 5] as [number, number, number],
    castShadow: true,
  },
  fill: {
    color: '#2244aa',
    intensity: 0.08,
    position: [-5, -2, -5] as [number, number, number],
  },
} as const

export const GLOBE_CONFIG = {
  radius: 1,
  widthSegments: 64,
  heightSegments: 64,
} as const

export const SCENE_CONFIG = {
  background: '#050a14',
} as const
