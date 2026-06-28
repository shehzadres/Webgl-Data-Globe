// Components
export { CameraController } from './CameraController'
export { CameraRig } from './CameraRig'

// State
export { useCameraStore } from './cameraStore'
export type { CameraTarget, CameraPresetKey } from './cameraStore'

// Presets & constraints
export { CAMERA_PRESETS, CAMERA_CONSTRAINTS } from './cameraPresets'
export type { CameraPreset } from './cameraPresets'

// Programmatic animation API
export {
  animateCameraTo,
  animateToPreset,
  focusLatLng,
  resetCamera,
  interruptAnimation,
} from './cameraAnimations'

// Utilities
export { sphericalToCartesian, clampTarget, lerpTarget, latLngToSpherical } from './cameraUtils'
