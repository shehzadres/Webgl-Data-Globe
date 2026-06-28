import { memo } from 'react'
import { useRouteStore } from '@/routes/routeStore'
import { RouteParticle } from './RouteParticle'

export const ParticleLayer = memo(() => {
  const dataset = useRouteStore((s) => s.dataset)
  if (!dataset) return null

  return (
    <group name="route-particles">
      {dataset.routes.map((route) => (
        <RouteParticle key={route.id} route={route} />
      ))}
    </group>
  )
})

ParticleLayer.displayName = 'ParticleLayer'
