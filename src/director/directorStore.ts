import { create } from 'zustand'

export type SceneId = 'intro' | 'markers' | 'routes' | 'particles' | 'final'

export const SCENE_ORDER: SceneId[] = ['intro', 'markers', 'routes', 'particles', 'final']

export interface SceneConfig {
  id: SceneId
  label: string
  /** Scroll progress threshold [0,1] at which this scene activates */
  threshold: number
}

export const SCENE_CONFIGS: SceneConfig[] = [
  { id: 'intro',     label: 'Introduction',  threshold: 0.00 },
  { id: 'markers',   label: 'Cities',         threshold: 0.20 },
  { id: 'routes',    label: 'Routes',         threshold: 0.42 },
  { id: 'particles', label: 'Environment',    threshold: 0.65 },
  { id: 'final',     label: 'Full View',      threshold: 0.85 },
]

interface DirectorState {
  currentScene: SceneId
  scrollProgress: number          // [0, 1] normalized scroll position
  isScrollMode: boolean           // true = scroll-driven, false = interactive
  reducedMotion: boolean          // respects prefers-reduced-motion
  markersVisible: boolean
  routesVisible: boolean
  particlesVisible: boolean

  setScene: (id: SceneId) => void
  setScrollProgress: (p: number) => void
  setScrollMode: (v: boolean) => void
  setMarkersVisible: (v: boolean) => void
  setRoutesVisible: (v: boolean) => void
  setParticlesVisible: (v: boolean) => void
}

const prefersReducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

export const useDirectorStore = create<DirectorState>((set) => ({
  currentScene:     'intro',
  scrollProgress:   0,
  isScrollMode:     true,
  reducedMotion:    prefersReducedMotion,
  markersVisible:   false,
  routesVisible:    false,
  particlesVisible: false,

  setScene:           (id) => set({ currentScene: id }),
  setScrollProgress:  (p)  => set({ scrollProgress: p }),
  setScrollMode:      (v)  => set({ isScrollMode: v }),
  setMarkersVisible:  (v)  => set({ markersVisible: v }),
  setRoutesVisible:   (v)  => set({ routesVisible: v }),
  setParticlesVisible:(v)  => set({ particlesVisible: v }),
}))
