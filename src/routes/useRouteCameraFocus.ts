import { useEffect } from 'react'
import { useRouteStore } from './routeStore'
import { animateCameraTo } from '@/camera'
import { greatCircleDistance } from './arcUtils'

/**
 * When a route is selected, smoothly reframe the camera toward
 * the geographic midpoint of the route at an appropriate distance.
 */
export function useRouteCameraFocus(): void {
  const selectedRouteId = useRouteStore((s) => s.selectedRouteId)
  const getRoute = useRouteStore((s) => s.getRoute)

  useEffect(() => {
    if (!selectedRouteId) return
    const route = getRoute(selectedRouteId)
    if (!route) return

    const midLat = (route.source.lat + route.destination.lat) / 2
    const midLng = (route.source.lng + route.destination.lng) / 2

    const DEG2RAD = Math.PI / 180
    const phi   = (90 - midLat) * DEG2RAD
    const theta = midLng * DEG2RAD

    // Scale camera distance based on route angular length
    const angDist = greatCircleDistance(
      route.source.lat, route.source.lng,
      route.destination.lat, route.destination.lng,
    )
    const radius = 3.0 + angDist * 1.5

    animateCameraTo({ phi, theta, radius }, 1.4, 'power2.inOut')
  }, [selectedRouteId, getRoute])
}
