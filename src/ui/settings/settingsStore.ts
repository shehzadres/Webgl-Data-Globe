import { create } from 'zustand'

export interface VisualizationSettings {
  showMarkers:    boolean
  showRoutes:     boolean
  showParticles:  boolean
  showAtmosphere: boolean
  showClouds:     boolean
  showNoise:      boolean
  autoRotate:     boolean
  rotateSpeed:    number
}

export interface UISettings {
  showHUD:       boolean
  showPanel:     boolean
  panelOpen:     boolean
  showFPS:       boolean
  showSearch:    boolean
}

export interface AnimationSettings {
  speed:           number  // global multiplier
  reducedMotion:   boolean
}

interface SettingsState {
  visualization: VisualizationSettings
  ui:            UISettings
  animation:     AnimationSettings

  setVisualization: (patch: Partial<VisualizationSettings>) => void
  setUI:            (patch: Partial<UISettings>) => void
  setAnimation:     (patch: Partial<AnimationSettings>) => void
  togglePanel:      () => void
  toggleSearch:     () => void
}

const prefersReduced =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

export const useSettingsStore = create<SettingsState>((set) => ({
  visualization: {
    showMarkers:    true,
    showRoutes:     true,
    showParticles:  true,
    showAtmosphere: true,
    showClouds:     true,
    showNoise:      true,
    autoRotate:     true,
    rotateSpeed:    0.06,
  },
  ui: {
    showHUD:   true,
    showPanel: true,
    panelOpen: false,
    showFPS:   false,
    showSearch:false,
  },
  animation: {
    speed: 1.0,
    reducedMotion: prefersReduced,
  },

  setVisualization: (patch) =>
    set((s) => ({ visualization: { ...s.visualization, ...patch } })),
  setUI: (patch) =>
    set((s) => ({ ui: { ...s.ui, ...patch } })),
  setAnimation: (patch) =>
    set((s) => ({ animation: { ...s.animation, ...patch } })),
  togglePanel: () =>
    set((s) => ({ ui: { ...s.ui, panelOpen: !s.ui.panelOpen } })),
  toggleSearch: () =>
    set((s) => ({ ui: { ...s.ui, showSearch: !s.ui.showSearch } })),
}))
