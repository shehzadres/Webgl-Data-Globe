/** A geographic coordinate on the globe surface. */
export interface GeoCoord {
  lat: number
  lng: number
}

/** A single data point in any dataset. */
export interface DataPoint {
  id: string
  name: string
  lat: number
  lng: number
  /** Optional numeric value — drives spike height, marker size, etc. */
  value?: number
  /** Optional category string — used for color grouping. */
  category?: string
  /** Arbitrary extra fields preserved for future use. */
  meta?: Record<string, unknown>
}

/** A complete named dataset. */
export interface Dataset {
  id: string
  name: string
  points: DataPoint[]
}

/** Validated + normalized DataPoint guaranteed to have a value. */
export interface NormalizedDataPoint extends DataPoint {
  value: number
  /** value scaled to [0, 1] relative to dataset min/max. */
  normalizedValue: number
}

/** Normalized dataset with precomputed min/max. */
export interface NormalizedDataset {
  id: string
  name: string
  points: NormalizedDataPoint[]
  minValue: number
  maxValue: number
}
