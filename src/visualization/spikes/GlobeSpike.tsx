import { useRef, useMemo, memo, useCallback } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { geoToWorld, geoOrientation } from '@/visualization/geoUtils'
import { getCategoryColor, getHighlightColor } from '@/visualization/colorPalette'
import { useVisualizationStore } from '@/visualization/visualizationStore'
import type { NormalizedDataPoint } from '@/visualization/types'

interface GlobeSpikeProps {
  point: NormalizedDataPoint
}

const SPIKE_WIDTH    = 0.006
const MIN_HEIGHT     = 0.02
const MAX_HEIGHT     = 0.25
const SURFACE_ELEV  = 0.001
const ANIM_SPEED     = 4

export const GlobeSpike = memo(({ point }: GlobeSpikeProps) => {
  const meshRef    = useRef<THREE.Mesh>(null)
  const growRef    = useRef(0) // 0 → 1 growth animation

  const { hoveredId, selectedId, setHovered, setSelected } = useVisualizationStore()
  const isHovered  = hoveredId  === point.id
  const isSelected = selectedId === point.id

  const targetHeight = MIN_HEIGHT + (MAX_HEIGHT - MIN_HEIGHT) * point.normalizedValue

  const baseColor  = useMemo(() => getCategoryColor(point.category),  [point.category])
  const hiColor    = useMemo(() => getHighlightColor(point.category), [point.category])
  const liveColor  = useMemo(() => baseColor.clone(), [baseColor])

  // Spike root sits on the surface; the geometry goes from 0 to targetHeight along +Y.
  // We translate +Y by half height so the box base is at Y=0.
  const rootPosition = useMemo(
    () => geoToWorld(point.lat, point.lng, SURFACE_ELEV),
    [point.lat, point.lng],
  )
  const quaternion = useMemo(
    () => geoOrientation(point.lat, point.lng),
    [point.lat, point.lng],
  )

  useFrame((_s, delta) => {
    if (!meshRef.current) return

    // Growth animation
    growRef.current = Math.min(1, growRef.current + delta * ANIM_SPEED)
    const liveHeight = targetHeight * growRef.current
    meshRef.current.scale.set(1, growRef.current, 1)
    // Shift mesh up so base stays on surface
    meshRef.current.position.copy(rootPosition)
    const offset = new THREE.Vector3(0, liveHeight / 2, 0).applyQuaternion(quaternion)
    meshRef.current.position.add(offset)

    // Color
    const tgt = (isHovered || isSelected) ? hiColor : baseColor
    liveColor.lerp(tgt, Math.min(1, delta * 10))
    ;(meshRef.current.material as THREE.MeshStandardMaterial).color.copy(liveColor)
    ;(meshRef.current.material as THREE.MeshStandardMaterial).emissive
      .copy(liveColor)
      .multiplyScalar(isSelected ? 0.5 : isHovered ? 0.25 : 0.05)
  })

  const onPointerOver = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    setHovered(point.id)
    document.body.style.cursor = 'pointer'
  }, [point.id, setHovered])

  const onPointerOut = useCallback(() => {
    setHovered(null)
    document.body.style.cursor = 'default'
  }, [setHovered])

  const onClick = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    setSelected(point.id)
  }, [point.id, setSelected])

  return (
    <mesh
      ref={meshRef}
      position={rootPosition}
      quaternion={quaternion}
      scale={[1, 0, 1]}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick}
      renderOrder={4}
    >
      <boxGeometry args={[SPIKE_WIDTH, targetHeight, SPIKE_WIDTH]} />
      <meshStandardMaterial
        color={baseColor}
        emissive={baseColor}
        emissiveIntensity={0.05}
        roughness={0.4}
        metalness={0.1}
        transparent
        opacity={0.92}
      />
    </mesh>
  )
})

GlobeSpike.displayName = 'GlobeSpike'
