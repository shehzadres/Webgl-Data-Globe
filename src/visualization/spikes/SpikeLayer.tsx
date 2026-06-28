import { memo } from 'react'
import { useVisualizationStore } from '@/visualization/visualizationStore'
import { GlobeSpike } from './GlobeSpike'

export const SpikeLayer = memo(() => {
  const dataset = useVisualizationStore((s) => s.dataset)
  if (!dataset) return null

  return (
    <group name="spikes">
      {dataset.points.map((point) => (
        <GlobeSpike key={point.id} point={point} />
      ))}
    </group>
  )
})

SpikeLayer.displayName = 'SpikeLayer'
