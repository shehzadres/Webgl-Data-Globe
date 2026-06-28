import type { GeoCoord } from '@/visualization/types'

/** A single route connecting two geographic locations. */
export interface Route {
  id: string
  sourceId: string
  sourceName: string
  source: GeoCoord
  destinationId: string
  destinationName: string
  destination: GeoCoord
  /** Optional category for color grouping */
  category?: string
  /** Optional weight driving arc width/opacity */
  weight?: number
  meta?: Record<string, unknown>
}

/** A collection of routes. */
export interface RouteDataset {
  id: string
  name: string
  routes: Route[]
}

/** Runtime state attached to a single arc — animation progress etc. */
export interface RouteRuntimeState {
  routeId: string
  /** Draw progress 0→1 for the arc reveal animation */
  drawProgress: number
  /** Normalized position [0,1] of the traveling particle along the curve */
  particleT: number
  isAnimatingIn: boolean
}
