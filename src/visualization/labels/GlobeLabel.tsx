import { memo, useMemo } from 'react'
import { Text } from '@react-three/drei'
import { geoToWorld } from '@/visualization/geoUtils'
import { useVisualizationStore } from '@/visualization/visualizationStore'
import { getCategoryColor } from '@/visualization/colorPalette'
import type { NormalizedDataPoint } from '@/visualization/types'

interface GlobeLabelProps {
  point: NormalizedDataPoint
}

const LABEL_ELEVATION = 0.32

export const GlobeLabel = memo(({ point }: GlobeLabelProps) => {
  const hoveredId  = useVisualizationStore((s) => s.hoveredId)
  const selectedId = useVisualizationStore((s) => s.selectedId)

  const position = useMemo(
    () => geoToWorld(point.lat, point.lng, LABEL_ELEVATION),
    [point.lat, point.lng],
  )

  const color = useMemo(() => {
    const c = getCategoryColor(point.category)
    return `#${c.getHexString()}`
  }, [point.category])

  const isVisible = hoveredId === point.id || selectedId === point.id

  // Hooks must not be conditional — render null after all hooks run
  if (!isVisible) return null

  return (
    <Text
      position={position}
      fontSize={0.055}
      color={color}
      anchorX="center"
      anchorY="bottom"
      outlineWidth={0.004}
      outlineColor="#050a14"
      depthOffset={-1}
      renderOrder={10}
    >
      {point.name}
    </Text>
  )
})

GlobeLabel.displayName = 'GlobeLabel'
