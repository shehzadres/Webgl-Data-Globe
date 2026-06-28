import * as THREE from 'three'
import type { CameraTarget } from './cameraStore'
import { CAMERA_CONSTRAINTS } from './cameraPresets'

/** Convert spherical camera target to Cartesian THREE.Vector3, writing into `out`. */
export function sphericalToCartesian(target: CameraTarget, out: THREE.Vector3): THREE.Vector3 {
  const { radius, phi, theta } = target
  out.setFromSphericalCoords(radius, phi, theta)
  return out
}

/** Clamp a CameraTarget to within CAMERA_CONSTRAINTS. Returns a new object. */
export function clampTarget(target: CameraTarget): CameraTarget {
  return {
    radius: THREE.MathUtils.clamp(
      target.radius,
      CAMERA_CONSTRAINTS.minRadius,
      CAMERA_CONSTRAINTS.maxRadius,
    ),
    phi: THREE.MathUtils.clamp(
      target.phi,
      CAMERA_CONSTRAINTS.minPhi,
      CAMERA_CONSTRAINTS.maxPhi,
    ),
    theta: target.theta,
  }
}

/** Linear interpolate between two CameraTargets. */
export function lerpTarget(
  a: CameraTarget,
  b: CameraTarget,
  t: number,
): CameraTarget {
  return {
    radius: THREE.MathUtils.lerp(a.radius, b.radius, t),
    phi: THREE.MathUtils.lerp(a.phi, b.phi, t),
    theta: THREE.MathUtils.lerp(a.theta, b.theta, t),
  }
}

/** Convert a lat/lng (degrees) to a spherical theta/phi for camera focus. */
export function latLngToSpherical(
  lat: number,
  lng: number,
): { phi: number; theta: number } {
  const phi = THREE.MathUtils.degToRad(90 - lat)
  const theta = THREE.MathUtils.degToRad(lng)
  return { phi, theta }
}

/** Smooth damp scalar — returns next value toward target. */
export function smoothDamp(
  current: number,
  target: number,
  lambda: number,
  delta: number,
): number {
  // Exponential decay — frame-rate independent
  return target + (current - target) * Math.exp(-lambda * delta)
}
