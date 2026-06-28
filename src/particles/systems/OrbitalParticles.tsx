import { useRef, useMemo, memo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import {
  randomOrbitalRings,
  writeOrbitalPosition,
  seededRng,
  buildPointsMaterial,
} from '@/particles/particleUtils'
import type { OrbitConfig } from '@/particles/particleConfig'

interface OrbitalParticlesProps {
  config: OrbitConfig
}

export const OrbitalParticles = memo(({ config }: OrbitalParticlesProps) => {
  const pointsRef = useRef<THREE.Points>(null)

  const { geometry, material, orbital } = useMemo(() => {
    const rng = seededRng(137)
    const { count, ringCount, minRadius, maxRadius, inclinationRange, speed, size, opacity, color, sizeAttenuation } = config

    const positions   = new Float32Array(count * 3)
    const phases      = new Float32Array(count)
    const speeds      = new Float32Array(count)
    const radii       = new Float32Array(count)
    const inclinations= new Float32Array(count)

    randomOrbitalRings(
      positions, phases, speeds, radii, inclinations,
      count, ringCount, minRadius, maxRadius, inclinationRange, speed, rng,
    )

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const mat = buildPointsMaterial(color, size, opacity, sizeAttenuation)

    return {
      geometry: geo,
      material: mat,
      orbital: { phases, speeds, radii, inclinations, positions },
    }
  }, [config])

  useFrame((_s, delta) => {
    if (!config.visible) return

    const { phases, speeds, radii, inclinations, positions } = orbital
    const count = config.count

    for (let i = 0; i < count; i++) {
      phases[i] += speeds[i] * delta
      writeOrbitalPosition(positions, i, radii[i], inclinations[i], phases[i])
    }

    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute
    posAttr.needsUpdate = true
  })

  if (!config.visible) return null

  return (
    <points ref={pointsRef} geometry={geometry} material={material} renderOrder={5} />
  )
})

OrbitalParticles.displayName = 'OrbitalParticles'
