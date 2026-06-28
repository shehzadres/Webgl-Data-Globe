import { create } from 'zustand'
import * as THREE from 'three'

export type CameraPresetKey = 'default' | 'close' | 'far' | 'top' | 'side'

export interface CameraTarget {
  /** Spherical coordinates: radius (distance), phi (polar), theta (azimuth) */
  radius: number
  phi: number
  theta: number
}

export interface CameraAnimationConfig {
  duration: number
  ease: string
}

interface CameraState {
  // Current interpolated spherical position (what Three.js camera reads)
  current: CameraTarget
  // Desired target (what animations/input drive toward)
  target: CameraTarget

  // Interaction state
  isUserInteracting: boolean
  autoRotate: boolean
  autoRotateSpeed: number // radians per second

  // Animation state
  isAnimating: boolean

  // Scratch vectors — allocated once, reused every frame
  _scratchVec: THREE.Vector3
  _scratchSpherical: THREE.Spherical

  // Actions
  setTarget: (target: Partial<CameraTarget>) => void
  setCurrent: (current: Partial<CameraTarget>) => void
  setUserInteracting: (v: boolean) => void
  setAutoRotate: (v: boolean) => void
  setAutoRotateSpeed: (v: number) => void
  setAnimating: (v: boolean) => void
}

const DEFAULT_TARGET: CameraTarget = {
  radius: 3.5,
  phi: Math.PI / 2,    // equatorial view
  theta: 0,
}

export const useCameraStore = create<CameraState>((set) => ({
  current: { ...DEFAULT_TARGET },
  target: { ...DEFAULT_TARGET },

  isUserInteracting: false,
  autoRotate: true,
  autoRotateSpeed: 0.08,
  isAnimating: false,

  // Allocated once — mutated in place by CameraRig every frame
  _scratchVec: new THREE.Vector3(),
  _scratchSpherical: new THREE.Spherical(),

  setTarget: (t) => set((s) => ({ target: { ...s.target, ...t } })),
  setCurrent: (c) => set((s) => ({ current: { ...s.current, ...c } })),
  setUserInteracting: (v) => set({ isUserInteracting: v }),
  setAutoRotate: (v) => set({ autoRotate: v }),
  setAutoRotateSpeed: (v) => set({ autoRotateSpeed: v }),
  setAnimating: (v) => set({ isAnimating: v }),
}))
