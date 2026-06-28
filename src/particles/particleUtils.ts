import * as THREE from 'three'

const TAU = Math.PI * 2

/**
 * Fill a Float32Array with random positions distributed uniformly
 * in a spherical shell between innerR and outerR.
 */
export function randomSphericalShell(
  positions: Float32Array,
  count: number,
  innerR: number,
  outerR: number,
  rng: () => number = Math.random,
): void {
  for (let i = 0; i < count; i++) {
    const r     = innerR + rng() * (outerR - innerR)
    const theta = Math.acos(2 * rng() - 1)   // uniform on sphere
    const phi   = rng() * TAU

    const idx = i * 3
    positions[idx]     = r * Math.sin(theta) * Math.cos(phi)
    positions[idx + 1] = r * Math.sin(theta) * Math.sin(phi)
    positions[idx + 2] = r * Math.cos(theta)
  }
}

/**
 * Fill a Float32Array with positions on orbital rings.
 * Each particle belongs to one of `ringCount` inclined circular orbits.
 */
export function randomOrbitalRings(
  positions: Float32Array,
  phases: Float32Array,          // [0,1] initial phase per particle
  speeds: Float32Array,          // radians per second per particle
  radii: Float32Array,           // orbital radius per particle
  inclinations: Float32Array,    // inclination angle per particle
  count: number,
  ringCount: number,
  minRadius: number,
  maxRadius: number,
  inclinationRange: number,
  baseSpeed: number,
  rng: () => number = Math.random,
): void {
  for (let i = 0; i < count; i++) {
    const ring       = Math.floor(rng() * ringCount)
    const r          = minRadius + (ring / (ringCount - 1)) * (maxRadius - minRadius)
    const inclination = (rng() - 0.5) * 2 * inclinationRange
    const phase      = rng() * TAU
    const speed      = baseSpeed * (0.6 + rng() * 0.8) * (ring % 2 === 0 ? 1 : -1)

    radii[i]        = r
    inclinations[i] = inclination
    phases[i]       = phase
    speeds[i]       = speed

    // Write initial position
    writeOrbitalPosition(positions, i, r, inclination, phase)
  }
}

/** Update a single orbital particle position at the given phase. */
export function writeOrbitalPosition(
  positions: Float32Array,
  i: number,
  r: number,
  inclination: number,
  phase: number,
): void {
  const idx = i * 3
  const cosI = Math.cos(inclination)
  const sinI = Math.sin(inclination)
  const x = r * Math.cos(phase)
  const y = r * Math.sin(phase) * sinI
  const z = r * Math.sin(phase) * cosI
  positions[idx]     = x
  positions[idx + 1] = y
  positions[idx + 2] = z
}

/**
 * Fill a Float32Array with random positions inside a sphere of radius `r`.
 */
export function randomVolumeSphere(
  positions: Float32Array,
  count: number,
  radius: number,
  rng: () => number = Math.random,
): void {
  for (let i = 0; i < count; i++) {
    // Rejection sampling for uniform volume distribution
    let x: number, y: number, z: number
    do {
      x = (rng() * 2 - 1) * radius
      y = (rng() * 2 - 1) * radius
      z = (rng() * 2 - 1) * radius
    } while (x * x + y * y + z * z > radius * radius)

    const idx = i * 3
    positions[idx]     = x
    positions[idx + 1] = y
    positions[idx + 2] = z
  }
}

/**
 * Fill sizes array with values in [minSize, maxSize].
 */
export function randomSizes(
  sizes: Float32Array,
  count: number,
  minSize: number,
  maxSize: number,
  rng: () => number = Math.random,
): void {
  for (let i = 0; i < count; i++) {
    sizes[i] = minSize + rng() * (maxSize - minSize)
  }
}

/**
 * Simple seeded LCG random number generator.
 * Returns a function () => [0, 1).
 */
export function seededRng(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0x100000000
  }
}

/**
 * Build a shared PointsMaterial.
 */
export function buildPointsMaterial(
  color: string,
  size: number,
  opacity: number,
  sizeAttenuation: boolean,
): THREE.PointsMaterial {
  return new THREE.PointsMaterial({
    color: new THREE.Color(color),
    size,
    sizeAttenuation,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: false,
  })
}
