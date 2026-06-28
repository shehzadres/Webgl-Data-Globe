import type { CameraTarget, CameraPresetKey } from './cameraStore'

export interface CameraPreset {
  label: string
  target: CameraTarget
  animationDuration: number
  ease: string
}

export const CAMERA_PRESETS: Record<CameraPresetKey, CameraPreset> = {
  default: {
    label: 'Default View',
    target: { radius: 3.5, phi: Math.PI / 2, theta: 0 },
    animationDuration: 1.2,
    ease: 'power2.inOut',
  },
  close: {
    label: 'Close View',
    target: { radius: 1.8, phi: Math.PI / 2, theta: 0 },
    animationDuration: 1.0,
    ease: 'power2.inOut',
  },
  far: {
    label: 'Far View',
    target: { radius: 7.0, phi: Math.PI / 2, theta: 0 },
    animationDuration: 1.4,
    ease: 'power2.inOut',
  },
  top: {
    label: 'Top View',
    target: { radius: 4.0, phi: 0.15, theta: 0 },
    animationDuration: 1.5,
    ease: 'power3.inOut',
  },
  side: {
    label: 'Side View',
    target: { radius: 3.5, phi: Math.PI / 2, theta: Math.PI / 2 },
    animationDuration: 1.2,
    ease: 'power2.inOut',
  },
}

export const CAMERA_CONSTRAINTS = {
  minRadius: 1.5,
  maxRadius: 10.0,
  minPhi: 0.05,       // prevent gimbal lock at north pole
  maxPhi: Math.PI - 0.05,
} as const
