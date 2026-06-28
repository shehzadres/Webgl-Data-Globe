import { useRef, useMemo, memo, useCallback } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { geoToWorld, geoOrientation } from '@/visualization/geoUtils'
import { getCategoryColor, getHighlightColor } from '@/visualization/colorPalette'
import { useVisualizationStore } from '@/visualization/visualizationStore'
import type { NormalizedDataPoint } from '@/visualization/types'

interface GlobeMarkerProps {
  point: NormalizedDataPoint
}

const BASE_RADIUS    = 0.008
const MAX_RADIUS     = 0.020
const ELEVATION      = 0.002
const ANIM_SPEED     = 6   // lerp speed for scale animation

export const GlobeMarker = memo(({ point }: GlobeMarkerProps) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const scaleRef = useRef(0)          // animated scale (0 → 1 on mount)
  const { hoveredId, selectedId, setHovered, setSelected } = useVisualizationStore()

  const isHovered  = hoveredId  === point.id
  const isSelected = selectedId === point.id

  const position = useMemo(
    () => geoToWorld(point.lat, point.lng, ELEVATION),
    [point.lat, point.lng],
  )
  const quaternion = useMemo(
    () => geoOrientation(point.lat, point.lng),
    [point.lat, point.lng],
  )

  const radius = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * point.normalizedValue

  const baseColor    = useMemo(() => getCategoryColor(point.category),  [point.category])
  const hoverColor   = useMemo(() => getHighlightColor(point.category), [point.category])

  // Pre-allocate color object — mutated each frame
  const liveColor = useMemo(() => baseColor.clone(), [baseColor])

  useFrame((_s, delta) => {
    if (!meshRef.current) return

    // Appear animation
    scaleRef.current = Math.min(1, scaleRef.current + delta * ANIM_SPEED)
    const finalScale = isSelected ? 1.5 : isHovered ? 1.25 : 1.0
    const animScale  = scaleRef.current * finalScale
    meshRef.current.scale.setScalar(animScale)

    // Color lerp
    const targetColor = (isHovered || isSelected) ? hoverColor : baseColor
    liveColor.lerp(targetColor, Math.min(1, delta * 10))
    ;(meshRef.current.material as THREE.MeshStandardMaterial).color.copy(liveColor)
    ;(meshRef.current.material as THREE.MeshStandardMaterial).emissive.copy(liveColor).multiplyScalar(
      isSelected ? 0.4 : isHovered ? 0.2 : 0,
    )
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
      position={position}
      quaternion={quaternion}
      scale={0}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick}
      renderOrder={4}
    >
      <sphereGeometry args={[radius, 8, 8]} />
      <meshStandardMaterial
        color={baseColor}
        emissive={baseColor}
        emissiveIntensity={0}
        roughness={0.3}
        metalness={0.2}
      />
    </mesh>
  )
})

GlobeMarker.displayName = 'GlobeMarker'
