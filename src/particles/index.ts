// Scene component
export { ParticleEngine } from './ParticleEngine'

// Individual systems (for custom assembly)
export { StarField } from './systems/StarField'
export { OrbitalParticles } from './systems/OrbitalParticles'
export { AmbientDust } from './systems/AmbientDust'

// Store
export { useParticleStore } from './particleStore'

// Config types and defaults
export type { ParticleConfig, StarFieldConfig, OrbitConfig, AmbientDustConfig } from './particleConfig'
export {
  DEFAULT_STAR_CONFIG,
  DEFAULT_ORBIT_CONFIG,
  DEFAULT_AMBIENT_CONFIG,
} from './particleConfig'

// Utilities
export {
  randomSphericalShell,
  randomOrbitalRings,
  randomVolumeSphere,
  randomSizes,
  seededRng,
  buildPointsMaterial,
} from './particleUtils'
