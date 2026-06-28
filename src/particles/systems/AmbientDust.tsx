import { useRef, useMemo, memo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import {
  randomVolumeSphere,
  seededRng,
  buildPointsMaterial,
} from '@/particles/particleUtils'
import type { AmbientDustConfig } from '@/particles/particleConfig'

interface AmbientDustProps {
  config: AmbientDustConfig
}

export const AmbientDust = memo(({ config }: AmbientDustProps) => {
  const pointsRef = useRef<THREE.Points>(null)

  const { geometry, material, drift } = useMemo(() => {
    const rng = seededRng(999)
    const { count, radius, size, opacity, color, sizeAttenuation } = config

    const positions = new Float32Array(count * 3)
    randomVolumeSphere(positions, count, radius, rng)

    // Per-particle random drift velocities
    const velocities = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      velocities[i] = (rng() - 0.5) * 0.004
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const mat = buildPointsMaterial(color, size, opacity, sizeAttenuation)

    return {
      geometry: geo,
      material: mat,
      drift: { positions, velocities, radius },
    }
  }, [config])

  useFrame((_s, delta) => {
    if (!config.visible) return

    const { positions, velocities, radius } = drift
    const count = config.count
    const speed = config.speed

    for (let i = 0; i < count; i++) {
      const idx = i * 3
      positions[idx]     += velocities[idx]     * speed * delta * 60
      positions[idx + 1] += velocities[idx + 1] * speed * delta * 60
      positions[idx + 2] += velocities[idx + 2] * speed * delta * 60

      // Wrap particles that drift too far back into the sphere
      const r2 = positions[idx] ** 2 + positions[idx + 1] ** 2 + positions[idx + 2] ** 2
      if (r2 > radius * radius) {
        positions[idx]     *= -0.9
        positions[idx + 1] *= -0.9
        positions[idx + 2] *= -0.9
      }
    }

    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute
    posAttr.needsUpdate = true
  })

  if (!config.visible) return null

  return (
    <points ref={pointsRef} geometry={geometry} material={material} renderOrder={3} />
  )
})

AmbientDust.displayName = 'AmbientDust'
