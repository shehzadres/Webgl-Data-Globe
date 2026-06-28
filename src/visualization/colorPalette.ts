import * as THREE from 'three'

/** Map from category string → THREE.Color. Extensible for new categories. */
export const CATEGORY_COLORS: Record<string, THREE.Color> = {
  asia:     new THREE.Color(0x4fc3f7),
  europe:   new THREE.Color(0x81c784),
  americas: new THREE.Color(0xffb74d),
  africa:   new THREE.Color(0xf06292),
  oceania:  new THREE.Color(0xce93d8),
  default:  new THREE.Color(0x90caf9),
}

export function getCategoryColor(category?: string): THREE.Color {
  return CATEGORY_COLORS[category ?? 'default'] ?? CATEGORY_COLORS.default
}

/** Highlighted version of a color — brighter for selected/hovered state. */
export function getHighlightColor(category?: string): THREE.Color {
  const base = getCategoryColor(category)
  return base.clone().multiplyScalar(1.8)
}
