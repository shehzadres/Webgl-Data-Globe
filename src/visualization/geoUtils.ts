import * as THREE from 'three'
import { GLOBE_CONFIG } from '@/systems/rendererConfig'

const DEG2RAD = Math.PI / 180

/**
 * Convert geographic coordinates to a THREE.Vector3 on the globe surface.
 *
 * Uses the standard geographic-to-spherical mapping:
 *   phi   = (90 - lat) * DEG2RAD   — polar angle from Y-up
 *   theta = lng * DEG2RAD           — azimuth from +Z axis
 *
 * @param lat  Latitude  in degrees [-90, 90]
 * @param lng  Longitude in degrees [-180, 180]
 * @param elevation  Additional radius above surface (default 0)
 * @param out  Optional pre-allocated Vector3 to avoid allocation
 */
export function geoToWorld(
  lat: number,
  lng: number,
  elevation = 0,
  out?: THREE.Vector3,
): THREE.Vector3 {
  const radius = GLOBE_CONFIG.radius + elevation
  const phi   = (90 - lat) * DEG2RAD
  const theta = lng * DEG2RAD

  const result = out ?? new THREE.Vector3()
  result.setFromSphericalCoords(radius, phi, theta)
  return result
}

/**
 * Compute the surface normal at a lat/lng position.
 * Returns a unit vector pointing outward from globe center.
 */
export function geoNormal(lat: number, lng: number, out?: THREE.Vector3): THREE.Vector3 {
  return geoToWorld(lat, lng, 0, out).normalize()
}

/**
 * Build a quaternion that orients an object so its +Y axis points
 * radially outward from the globe surface at the given lat/lng.
 * Used to align spikes, markers, and labels with the surface normal.
 */
export function geoOrientation(lat: number, lng: number, out?: THREE.Quaternion): THREE.Quaternion {
  const normal = geoNormal(lat, lng)
  const up = new THREE.Vector3(0, 1, 0)
  const q = out ?? new THREE.Quaternion()
  q.setFromUnitVectors(up, normal)
  return q
}

/**
 * Compute great-circle midpoint between two geographic coordinates.
 * Used for arc label placement.
 */
export function geoMidpoint(a: { lat: number; lng: number }, b: { lat: number; lng: number }): { lat: number; lng: number } {
  const lat = (a.lat + b.lat) / 2
  const lng = (a.lng + b.lng) / 2
  return { lat, lng }
}
