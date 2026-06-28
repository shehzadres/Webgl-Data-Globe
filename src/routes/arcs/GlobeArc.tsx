import { useRef, useMemo, memo, useCallback, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { buildArcCurve, autoArcHeight } from '@/routes/arcUtils'
import { getRouteColor, getRouteHighlightColor } from '@/routes/routeColors'
import { useRouteStore } from '@/routes/routeStore'
import type { Route } from '@/routes/routeTypes'

interface GlobeArcProps {
  route: Route
}

const TUBE_RADIUS       = 0.003
const TUBE_SEGMENTS     = 64
const TUBE_RADIAL_SEGS  = 4
const DRAW_SPEED        = 0.9   // fraction per second
const COLOR_LERP_SPEED  = 10

export const GlobeArc = memo(({ route }: GlobeArcProps) => {
  const tubeRef    = useRef<THREE.Mesh>(null)
  const drawRef    = useRef(0)            // current draw progress [0,1]
  const liveColor  = useRef<THREE.Color | null>(null)

  const { hoveredRouteId, selectedRouteId, setHoveredRoute, setSelectedRoute } = useRouteStore()
  const isHovered  = hoveredRouteId  === route.id
  const isSelected = selectedRouteId === route.id

  const curve = useMemo(
    () =>
      buildArcCurve(
        route.source.lat, route.source.lng,
        route.destination.lat, route.destination.lng,
        autoArcHeight(
          route.source.lat, route.source.lng,
          route.destination.lat, route.destination.lng,
        ),
        TUBE_SEGMENTS,
      ),
    [route],
  )

  const geometry = useMemo(() => {
    const geo = new THREE.TubeGeometry(
      curve,
      TUBE_SEGMENTS,
      TUBE_RADIUS * (1 + (route.weight ?? 0.5)),
      TUBE_RADIAL_SEGS,
      false,
    )
    // Start fully hidden — draw range opens in useFrame
    geo.setDrawRange(0, 0)
    return geo
  }, [curve, route.weight])

  const baseColor = useMemo(() => getRouteColor(route.category), [route.category])
  const hiColor   = useMemo(() => getRouteHighlightColor(route.category), [route.category])

  // Initialise liveColor once
  useEffect(() => {
    liveColor.current = baseColor.clone()
  }, [baseColor])

  useFrame((_s, delta) => {
    if (!tubeRef.current || !liveColor.current) return

    // Draw-range reveal animation
    drawRef.current = Math.min(1, drawRef.current + delta * DRAW_SPEED)
    const totalIndex = geometry.index
      ? geometry.index.count
      : geometry.attributes.position.count
    geometry.setDrawRange(0, Math.floor(drawRef.current * totalIndex))

    // Color lerp
    const targetColor = (isHovered || isSelected) ? hiColor : baseColor
    liveColor.current.lerp(targetColor, Math.min(1, delta * COLOR_LERP_SPEED))
    const mat = tubeRef.current.material as THREE.MeshBasicMaterial
    mat.color.copy(liveColor.current)
    mat.opacity = isSelected ? 1.0 : isHovered ? 0.85 : 0.55
  })

  const onPointerOver = useCallback(
    (e: { stopPropagation: () => void }) => {
      e.stopPropagation()
      setHoveredRoute(route.id)
      document.body.style.cursor = 'pointer'
    },
    [route.id, setHoveredRoute],
  )
  const onPointerOut = useCallback(() => {
    setHoveredRoute(null)
    document.body.style.cursor = 'default'
  }, [setHoveredRoute])
  const onClick = useCallback(
    (e: { stopPropagation: () => void }) => {
      e.stopPropagation()
      setSelectedRoute(route.id)
    },
    [route.id, setSelectedRoute],
  )

  return (
    <mesh
      ref={tubeRef}
      geometry={geometry}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick}
      renderOrder={5}
    >
      <meshBasicMaterial
        color={baseColor}
        transparent
        opacity={0.55}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
})

GlobeArc.displayName = 'GlobeArc'
