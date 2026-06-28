import { create } from 'zustand'
import type { NormalizedDataset, NormalizedDataPoint } from './types'

interface VisualizationState {
  dataset: NormalizedDataset | null
  hoveredId: string | null
  selectedId: string | null

  setDataset: (ds: NormalizedDataset) => void
  setHovered: (id: string | null) => void
  setSelected: (id: string | null) => void

  /** Convenience: look up a point by id from active dataset. */
  getPoint: (id: string) => NormalizedDataPoint | undefined
}

export const useVisualizationStore = create<VisualizationState>((set, get) => ({
  dataset: null,
  hoveredId: null,
  selectedId: null,

  setDataset: (ds) => set({ dataset: ds, hoveredId: null, selectedId: null }),
  setHovered: (id) => set({ hoveredId: id }),
  setSelected: (id) =>
    set((s) => ({ selectedId: s.selectedId === id ? null : id })),

  getPoint: (id) => get().dataset?.points.find((p) => p.id === id),
}))
