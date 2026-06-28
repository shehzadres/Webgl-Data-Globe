import { useRef, useMemo, memo, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { randomSphericalShell, randomSizes, seededRng } from '@/particles/particleUtils'
import { createStarMaterial } from '@/shaders'
import { shaderUniforms } from '@/shaders'
import type { StarFieldConfig } from '@/particles/particleConfig'

interface StarFieldProps {
  config: StarFieldConfig
}

export const StarField = memo(({ config }: StarFieldProps) => {
  const pointsRef = useRef<THREE.Points>(null)

  const { geometry, material } = useMemo(() => {
    const rng = seededRng(42)
    const { count, innerRadius, outerRadius, size, opacity, color } = config

    const positions = new Float32Array(count * 3)
    randomSphericalShell(positions, count, innerRadius, outerRadius, rng)

    // Per-star size variation stored as vertex attribute
    const sizes = new Float32Array(count)
    randomSizes(sizes, count, 0.3, 1.8, rng)

    // Per-star alpha variation — baked in, GPU shader animates on top
    const alphas = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      alphas[i] = 0.5 + rng() * 0.5
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('alpha',    new THREE.BufferAttribute(alphas, 1))

    const mat = createStarMaterial({
      color,
      opacity,
      baseSize: size,
    })

    // Register for per-frame uTime ticks via ShaderManager
    shaderUniforms.registerTimed(mat)

    return { geometry: geo, material: mat }
  }, [config])

  useEffect(() => {
    return () => {
      shaderUniforms.unregisterTimed(material)
      material.dispose()
      geometry.dispose()
    }
  }, [material, geometry])

  // uTime is handled by ShaderManager — no per-frame JS work needed here
  useFrame(() => {
    // StarField update is now fully GPU-driven via uTime uniform
    // Speed config exposed via ShaderManager.tick rate — nothing to do here
  })

  if (!config.visible) return null

  return (
    <points ref={pointsRef} geometry={geometry} material={material} renderOrder={-1} />
  )
})

StarField.displayName = 'StarField'
