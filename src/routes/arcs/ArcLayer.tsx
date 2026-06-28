import { memo } from 'react'
import { useRouteStore } from '@/routes/routeStore'
import { GlobeArc } from './GlobeArc'

export const ArcLayer = memo(() => {
  const dataset = useRouteStore((s) => s.dataset)
  if (!dataset) return null

  return (
    <group name="arcs">
      {dataset.routes.map((route) => (
        <GlobeArc key={route.id} route={route} />
      ))}
    </group>
  )
})

ArcLayer.displayName = 'ArcLayer'
