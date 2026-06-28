import { memo } from 'react'
import { ArcLayer } from './arcs/ArcLayer'
import { ParticleLayer } from './particles/ParticleLayer'

export const RouteLayer = memo(() => {
  return (
    <group name="routes">
      <ArcLayer />
      <ParticleLayer />
    </group>
  )
})

RouteLayer.displayName = 'RouteLayer'
