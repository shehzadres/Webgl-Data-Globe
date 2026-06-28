import { memo } from 'react'
import { useVisualizationStore } from '@/visualization/visualizationStore'
import styles from './DataInfoPanel.module.css'

export const DataInfoPanel = memo(() => {
  const { selectedId, getPoint } = useVisualizationStore()
  const point = selectedId ? getPoint(selectedId) : null

  if (!point) return null

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.name}>{point.name}</span>
        <button
          className={styles.close}
          onClick={() => useVisualizationStore.getState().setSelected(null)}
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Latitude</span>
        <span className={styles.value}>{point.lat.toFixed(2)}°</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Longitude</span>
        <span className={styles.value}>{point.lng.toFixed(2)}°</span>
      </div>
      {point.category && (
        <div className={styles.row}>
          <span className={styles.label}>Region</span>
          <span className={styles.value}>{point.category}</span>
        </div>
      )}
      <div className={styles.row}>
        <span className={styles.label}>Population</span>
        <span className={styles.value}>{point.value.toFixed(1)}M</span>
      </div>
    </div>
  )
})

DataInfoPanel.displayName = 'DataInfoPanel'
