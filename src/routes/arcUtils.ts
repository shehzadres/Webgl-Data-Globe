import * as THREE from 'three'
import { geoToWorld } from '@/visualization/geoUtils'
import { GLOBE_CONFIG } from '@/systems/rendererConfig'

const DEG2RAD = Math.PI / 180

/**
 * Compute the great-circle angular distance (radians) between two lat/lng pairs
 * using the Haversine formula.
 */
export function greatCircleDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
): number {
  const dLat = (lat2 - lat1) * DEG2RAD
  const dLng = (lng2 - lng1) * DEG2RAD
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * DEG2RAD) * Math.cos(lat2 * DEG2RAD) *
    Math.sin(dLng / 2) ** 2
  return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

/**
 * Compute the great-circle distance in km.
 */
export function greatCircleDistanceKm(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
): number {
  return greatCircleDistance(lat1, lng1, lat2, lng2) * 6371
}

/**
 * Interpolate a point on the great-circle arc between two surface points
 * at parameter t ∈ [0, 1] using SLERP, then lift it to `arcHeight` above
 * the globe surface.
 *
 * @param from  Source world position (on globe surface)
 * @param to    Destination world position (on globe surface)
 * @param t     Parameter [0, 1] along the arc
 * @param arcHeight  Elevation above surface at arc midpoint (tapers to 0 at ends)
 * @param out   Pre-allocated vector to write into
 */
export function sampleArcPoint(
  from: THREE.Vector3,
  to: THREE.Vector3,
  t: number,
  arcHeight: number,
  out: THREE.Vector3,
): THREE.Vector3 {
  // SLERP gives the great-circle path on the unit sphere
  out.copy(from).normalize()
  const toNorm = to.clone().normalize()
  out.lerp(toNorm, t).normalize()

  // Lift above surface: parabolic envelope peaks at t=0.5
  const lift = GLOBE_CONFIG.radius + arcHeight * Math.sin(t * Math.PI)
  out.multiplyScalar(lift)
  return out
}

/**
 * Build a CatmullRomCurve3 following the great-circle arc.
 * The curve lifts `arcHeight` units above the globe surface at its midpoint.
 *
 * @param sourceLat    Source latitude
 * @param sourceLng    Source longitude
 * @param destLat      Destination latitude
 * @param destLng      Destination longitude
 * @param arcHeight    Max elevation above surface (scales with distance)
 * @param segments     Number of interpolated points
 */
export function buildArcCurve(
  sourceLat: number, sourceLng: number,
  destLat: number,   destLng: number,
  arcHeight?: number,
  segments = 64,
): THREE.CatmullRomCurve3 {
  const from = geoToWorld(sourceLat, sourceLng)
  const to   = geoToWorld(destLat,   destLng)

  // Auto-scale arc height with angular distance so long routes arch more
  const angDist = greatCircleDistance(sourceLat, sourceLng, destLat, destLng)
  const height  = arcHeight ?? Math.max(0.08, angDist * 0.4)

  const scratch = new THREE.Vector3()
  const points: THREE.Vector3[] = []

  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    points.push(sampleArcPoint(from, to, t, height, scratch).clone())
  }

  return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5)
}

/**
 * Compute a reasonable arc height for a route based on its angular distance.
 */
export function autoArcHeight(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
): number {
  const ang = greatCircleDistance(lat1, lng1, lat2, lng2)
  return THREE.MathUtils.clamp(ang * 0.45, 0.08, 0.55)
}
