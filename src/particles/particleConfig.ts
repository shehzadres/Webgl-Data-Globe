/** Configuration for any particle system. All fields have defaults. */
export interface ParticleConfig {
  /** Number of particles */
  count: number
  /** Base point size in world units (passed to PointsMaterial) */
  size: number
  /** Size attenuation with depth */
  sizeAttenuation: boolean
  /** Base opacity */
  opacity: number
  /** Hex color string */
  color: string
  /** Whether this system is currently visible */
  visible: boolean
  /** Animation speed multiplier */
  speed: number
}

export interface StarFieldConfig extends ParticleConfig {
  /** Inner radius — stars don't appear closer than this */
  innerRadius: number
  /** Outer radius — stars don't appear farther than this */
  outerRadius: number
  /** Fraction of stars that twinkle */
  twinkleFraction: number
}

export interface OrbitConfig extends ParticleConfig {
  /** Number of orbital rings */
  ringCount: number
  /** Minimum orbital radius */
  minRadius: number
  /** Maximum orbital radius */
  maxRadius: number
  /** Orbital inclination range (radians) */
  inclinationRange: number
}

export interface AmbientDustConfig extends ParticleConfig {
  /** Cloud radius around origin */
  radius: number
  /** How far dust drifts before wrapping */
  driftRange: number
}

// ── Defaults ──────────────────────────────────────────────────────────────────

export const DEFAULT_STAR_CONFIG: StarFieldConfig = {
  count: 8000,
  size: 0.8,
  sizeAttenuation: false,
  opacity: 0.85,
  color: '#ffffff',
  visible: true,
  speed: 0.3,
  innerRadius: 12,
  outerRadius: 80,
  twinkleFraction: 0.3,
}

export const DEFAULT_ORBIT_CONFIG: OrbitConfig = {
  count: 600,
  size: 1.2,
  sizeAttenuation: false,
  opacity: 0.7,
  color: '#88ccff',
  visible: true,
  speed: 1.0,
  ringCount: 4,
  minRadius: 1.25,
  maxRadius: 2.0,
  inclinationRange: Math.PI * 0.45,
}

export const DEFAULT_AMBIENT_CONFIG: AmbientDustConfig = {
  count: 3000,
  size: 0.5,
  sizeAttenuation: false,
  opacity: 0.25,
  color: '#aaccff',
  visible: true,
  speed: 0.15,
  radius: 6,
  driftRange: 0.002,
}
