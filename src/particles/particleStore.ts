import { create } from 'zustand'
import {
  DEFAULT_STAR_CONFIG,
  DEFAULT_ORBIT_CONFIG,
  DEFAULT_AMBIENT_CONFIG,
} from './particleConfig'
import type { StarFieldConfig, OrbitConfig, AmbientDustConfig } from './particleConfig'

interface ParticleEngineState {
  stars: StarFieldConfig
  orbits: OrbitConfig
  dust: AmbientDustConfig

  setStars: (patch: Partial<StarFieldConfig>) => void
  setOrbits: (patch: Partial<OrbitConfig>) => void
  setDust: (patch: Partial<AmbientDustConfig>) => void
}

export const useParticleStore = create<ParticleEngineState>((set) => ({
  stars:  { ...DEFAULT_STAR_CONFIG },
  orbits: { ...DEFAULT_ORBIT_CONFIG },
  dust:   { ...DEFAULT_AMBIENT_CONFIG },

  setStars:  (patch) => set((s) => ({ stars:  { ...s.stars,  ...patch } })),
  setOrbits: (patch) => set((s) => ({ orbits: { ...s.orbits, ...patch } })),
  setDust:   (patch) => set((s) => ({ dust:   { ...s.dust,   ...patch } })),
}))
