import { memo } from 'react'
import { useRouteStore } from '@/routes/routeStore'
import { greatCircleDistanceKm } from '@/routes/arcUtils'
import styles from './RouteInfoPanel.module.css'

export const RouteInfoPanel = memo(() => {
  const { selectedRouteId, getRoute } = useRouteStore()
  const route = selectedRouteId ? getRoute(selectedRouteId) : null

  if (!route) return null

  const distKm = greatCircleDistanceKm(
    route.source.lat, route.source.lng,
    route.destination.lat, route.destination.lng,
  )

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.title}>Route</span>
        <button
          className={styles.close}
          onClick={() => useRouteStore.getState().setSelectedRoute(null)}
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <div className={styles.route}>
        <span className={styles.city}>{route.sourceName}</span>
        <span className={styles.arrow}>→</span>
        <span className={styles.city}>{route.destinationName}</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.row}>
        <span className={styles.label}>Distance</span>
        <span className={styles.value}>{Math.round(distKm).toLocaleString()} km</span>
      </div>
      {route.category && (
        <div className={styles.row}>
          <span className={styles.label}>Category</span>
          <span className={styles.value}>{route.category}</span>
        </div>
      )}
      <div className={styles.row}>
        <span className={styles.label}>ID</span>
        <span className={styles.value}>{route.id}</span>
      </div>
    </div>
  )
})

RouteInfoPanel.displayName = 'RouteInfoPanel'
