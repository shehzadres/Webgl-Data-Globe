import { memo } from 'react'
import { useVisualizationStore } from '@/visualization/visualizationStore'
import { GlobeLabel } from './GlobeLabel'

export const LabelLayer = memo(() => {
  const dataset = useVisualizationStore((s) => s.dataset)
  if (!dataset) return null

  return (
    <group name="labels">
      {dataset.points.map((point) => (
        <GlobeLabel key={point.id} point={point} />
      ))}
    </group>
  )
})

LabelLayer.displayName = 'LabelLayer'
