import gsap from 'gsap'
import { useCameraStore } from './cameraStore'
import { CAMERA_PRESETS, CAMERA_CONSTRAINTS } from './cameraPresets'
import { clampTarget } from './cameraUtils'
import type { CameraTarget, CameraPresetKey } from './cameraStore'

let activeTween: gsap.core.Tween | null = null

/** Kill any running camera tween before starting a new one. */
function killActive(): void {
  if (activeTween) {
    activeTween.kill()
    activeTween = null
  }
}

/**
 * Animate camera to an arbitrary CameraTarget.
 * Interrupts any running animation cleanly.
 */
export function animateCameraTo(
  targetOverride: Partial<CameraTarget>,
  duration = 1.2,
  ease = 'power2.inOut',
): void {
  killActive()

  const store = useCameraStore.getState()
  const resolved = clampTarget({ ...store.target, ...targetOverride })

  store.setAnimating(true)

  // Proxy object that GSAP tweens — CameraRig reads store.target each frame
  const proxy = { ...store.current }

  activeTween = gsap.to(proxy, {
    radius: resolved.radius,
    phi: resolved.phi,
    theta: resolved.theta,
    duration,
    ease,
    onUpdate() {
      useCameraStore.getState().setTarget({
        radius: proxy.radius,
        phi: proxy.phi,
        theta: proxy.theta,
      })
    },
    onComplete() {
      useCameraStore.getState().setAnimating(false)
      activeTween = null
    },
    onInterrupt() {
      useCameraStore.getState().setAnimating(false)
      activeTween = null
    },
  })
}

/** Animate to a named preset. */
export function animateToPreset(key: CameraPresetKey): void {
  const preset = CAMERA_PRESETS[key]
  animateCameraTo(preset.target, preset.animationDuration, preset.ease)
}

/** Focus camera on a world-space lat/lng at a given distance. */
export function focusLatLng(
  lat: number,
  lng: number,
  radius?: number,
  duration = 1.4,
): void {
  const THREE = { MathUtils: { degToRad: (d: number) => (d * Math.PI) / 180 } }
  const phi = THREE.MathUtils.degToRad(90 - lat)
  const theta = THREE.MathUtils.degToRad(lng)
  const currentRadius = useCameraStore.getState().target.radius
  animateCameraTo(
    {
      phi,
      theta,
      radius: radius ?? Math.max(currentRadius, CAMERA_CONSTRAINTS.minRadius + 0.5),
    },
    duration,
  )
}

/** Reset to default view. */
export function resetCamera(): void {
  animateToPreset('default')
}

/** Interrupt any active programmatic animation. */
export function interruptAnimation(): void {
  killActive()
  useCameraStore.getState().setAnimating(false)
}
