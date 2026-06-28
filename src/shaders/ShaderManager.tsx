import { memo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { shaderUniforms } from './uniforms/shaderUniforms'

/**
 * Mounts into the R3F scene and calls shaderUniforms.tick() every frame.
 * Must be placed inside <Canvas>.
 * All shader materials that need time must register via shaderUniforms.registerTimed().
 */
export const ShaderManager = memo(() => {
  const { size } = useThree()

  useFrame((_s, delta) => {
    shaderUniforms.tick(delta)
  })

  shaderUniforms.updateResolution(size.width, size.height)

  return null
})

ShaderManager.displayName = 'ShaderManager'
