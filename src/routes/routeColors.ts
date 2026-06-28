import * as THREE from 'three'

export const ROUTE_CATEGORY_COLORS: Record<string, THREE.Color> = {
  intercontinental: new THREE.Color(0x64b5f6),
  asia:             new THREE.Color(0x4fc3f7),
  europe:           new THREE.Color(0x81c784),
  americas:         new THREE.Color(0xffb74d),
  africa:           new THREE.Color(0xf06292),
  pacific:          new THREE.Color(0xce93d8),
  default:          new THREE.Color(0x90caf9),
}

export function getRouteColor(category?: string): THREE.Color {
  return ROUTE_CATEGORY_COLORS[category ?? 'default'] ?? ROUTE_CATEGORY_COLORS.default
}

export function getRouteHighlightColor(category?: string): THREE.Color {
  return getRouteColor(category).clone().multiplyScalar(2.0)
}
