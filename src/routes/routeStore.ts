import { create } from 'zustand'
import type { Route, RouteDataset } from './routeTypes'

interface RouteState {
  dataset: RouteDataset | null
  hoveredRouteId: string | null
  selectedRouteId: string | null
  visibleRouteIds: Set<string>

  setDataset: (ds: RouteDataset) => void
  setHoveredRoute: (id: string | null) => void
  setSelectedRoute: (id: string | null) => void

  getRoute: (id: string) => Route | undefined
}

export const useRouteStore = create<RouteState>((set, get) => ({
  dataset: null,
  hoveredRouteId: null,
  selectedRouteId: null,
  visibleRouteIds: new Set(),

  setDataset: (ds) =>
    set({
      dataset: ds,
      hoveredRouteId: null,
      selectedRouteId: null,
      visibleRouteIds: new Set(ds.routes.map((r) => r.id)),
    }),

  setHoveredRoute: (id) => set({ hoveredRouteId: id }),

  setSelectedRoute: (id) =>
    set((s) => ({ selectedRouteId: s.selectedRouteId === id ? null : id })),

  getRoute: (id) => get().dataset?.routes.find((r) => r.id === id),
}))
