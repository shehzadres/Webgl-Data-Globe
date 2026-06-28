import { useRef, memo } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useCameraStore } from './cameraStore'
import { sphericalToCartesian, smoothDamp } from './cameraUtils'

// Damping lambdas — higher = snappier
const POSITION_LAMBDA = 6
const AUTO_ROTATE_RESUME_LAMBDA = 2

// Pre-allocated — never recreated per frame
const _pos = new THREE.Vector3()
const _look = new THREE.Vector3(0, 0, 0) // always look at origin

export const CameraRig = memo(() => {
  const { camera } = useThree()
  const autoRotateTheta = useRef(0)
  const autoRotateBlend = useRef(0) // 0 = paused, 1 = full speed

  useFrame((_state, delta) => {
    const {
      current,
      target,
      isUserInteracting,
      autoRotate,
      autoRotateSpeed,
      setCurrent,
    } = useCameraStore.getState()

    // ── Auto-rotate blend (smooth resume after interaction) ──────────────────
    const blendTarget = autoRotate && !isUserInteracting ? 1 : 0
    autoRotateBlend.current = smoothDamp(
      autoRotateBlend.current,
      blendTarget,
      AUTO_ROTATE_RESUME_LAMBDA,
      delta,
    )

    // Accumulate auto-rotate offset — applied on top of user theta
    autoRotateTheta.current += autoRotateSpeed * delta * autoRotateBlend.current

    // ── Smooth-damp current toward target ────────────────────────────────────
    const nextRadius = smoothDamp(current.radius, target.radius, POSITION_LAMBDA, delta)
    const nextPhi    = smoothDamp(current.phi,    target.phi,    POSITION_LAMBDA, delta)
    const nextTheta  = smoothDamp(current.theta,  target.theta,  POSITION_LAMBDA, delta)

    setCurrent({ radius: nextRadius, phi: nextPhi, theta: nextTheta })

    // ── Apply to Three.js camera ─────────────────────────────────────────────
    sphericalToCartesian(
      {
        radius: nextRadius,
        phi: nextPhi,
        theta: nextTheta + autoRotateTheta.current,
      },
      _pos,
    )

    camera.position.copy(_pos)
    camera.lookAt(_look)
  })

  return null
})

CameraRig.displayName = 'CameraRig'
