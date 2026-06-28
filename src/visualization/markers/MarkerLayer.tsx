import { memo } from 'react'
import { useVisualizationStore } from '@/visualization/visualizationStore'
import { GlobeMarker } from './GlobeMarker'

export const MarkerLayer = memo(() => {
  const dataset = useVisualizationStore((s) => s.dataset)
  if (!dataset) return null

  return (
    <group name="markers">
      {dataset.points.map((point) => (
        <GlobeMarker key={point.id} point={point} />
      ))}
    </group>
  )
})

MarkerLayer.displayName = 'MarkerLayer'
