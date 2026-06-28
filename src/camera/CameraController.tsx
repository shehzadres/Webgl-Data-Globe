import { memo } from 'react'
import { useThree } from '@react-three/fiber'
import { CameraRig } from './CameraRig'
import { useCameraInput } from './useCameraInput'

/**
 * Drop-in replacement for the previous OrbitControls CameraController.
 * Must be rendered inside the R3F Canvas.
 */
export const CameraController = memo(() => {
  const { gl } = useThree()

  // Bind input to the WebGL canvas DOM element
  useCameraInput(gl.domElement)

  return <CameraRig />
})

CameraController.displayName = 'CameraController'
