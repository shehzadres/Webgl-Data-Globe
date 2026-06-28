import { useRef, memo } from 'react'
import * as THREE from 'three'
import { Text } from '@react-three/drei'
import { useAnimationLoop } from '@/hooks/useAnimationLoop'
import { GLOBE_CONFIG } from '@/systems/rendererConfig'

interface LoadingIndicatorProps {
  progress: number
  error: string | null
}

const SPHERE_ARGS: [number, number, number] = [GLOBE_CONFIG.radius, 16, 16]

export const LoadingIndicator = memo(({ progress, error }: LoadingIndicatorProps) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useAnimationLoop((_state, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += 0.5 * delta
    meshRef.current.rotation.x += 0.2 * delta
  })

  const label = error
    ? `ERROR: ${error}`
    : `LOADING TEXTURES  ${Math.round(progress * 100)}%`

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={SPHERE_ARGS} />
        <meshBasicMaterial color="#1a3a6b" wireframe />
      </mesh>
      <Text
        position={[0, -1.6, 0]}
        fontSize={0.1}
        color={error ? '#ff4444' : '#4a7fa8'}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  )
})

LoadingIndicator.displayName = 'LoadingIndicator'
