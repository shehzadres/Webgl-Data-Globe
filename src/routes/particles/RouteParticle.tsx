import { useRef, useMemo, memo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { buildArcCurve, autoArcHeight } from '@/routes/arcUtils'
import { getRouteColor } from '@/routes/routeColors'
import type { Route } from '@/routes/routeTypes'

interface RouteParticleProps {
  route: Route
  speed?: number   // full-loop time in seconds (default 4)
  size?: number
}

const DEFAULT_SPEED = 4   // seconds per full traversal
const PARTICLE_SIZE = 0.012

// Pre-allocated scratch — reused every frame
const _pos = new THREE.Vector3()

export const RouteParticle = memo(({ route, speed = DEFAULT_SPEED, size = PARTICLE_SIZE }: RouteParticleProps) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const tRef    = useRef(0)           // [0, 1] along curve
  // Stagger start so particles don't all begin at t=0
  const offsetRef = useRef(Math.random())

  const curve = useMemo(
    () =>
      buildArcCurve(
        route.source.lat, route.source.lng,
        route.destination.lat, route.destination.lng,
        autoArcHeight(
          route.source.lat, route.source.lng,
          route.destination.lat, route.destination.lng,
        ),
      ),
    [route],
  )

  const color = useMemo(() => getRouteColor(route.category), [route.category])

  useFrame((_s, delta) => {
    if (!meshRef.current) return

    tRef.current = (tRef.current + delta / speed) % 1
    const t = (tRef.current + offsetRef.current) % 1

    curve.getPointAt(t, _pos)
    meshRef.current.position.copy(_pos)

    // Fade in at start, fade out at end
    const fade = Math.min(t * 6, 1) * Math.min((1 - t) * 6, 1)
    ;(meshRef.current.material as THREE.MeshBasicMaterial).opacity = fade * 0.9
  })

  return (
    <mesh ref={meshRef} renderOrder={6}>
      <sphereGeometry args={[size, 6, 6]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0}
        depthWrite={false}
      />
    </mesh>
  )
})

RouteParticle.displayName = 'RouteParticle'
