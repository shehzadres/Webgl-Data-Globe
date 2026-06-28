import type { Dataset, DataPoint, NormalizedDataset, NormalizedDataPoint } from './types'

/** Validate that a raw object conforms to DataPoint shape. */
function validatePoint(raw: unknown, index: number): DataPoint {
  if (typeof raw !== 'object' || raw === null) {
    throw new Error(`Dataset point at index ${index} is not an object`)
  }
  const r = raw as Record<string, unknown>

  if (typeof r.id !== 'string' || r.id.trim() === '') {
    throw new Error(`Dataset point at index ${index} missing string 'id'`)
  }
  if (typeof r.name !== 'string') {
    throw new Error(`Dataset point at index ${index} missing string 'name'`)
  }
  if (typeof r.lat !== 'number' || r.lat < -90 || r.lat > 90) {
    throw new Error(`Dataset point at index ${index} has invalid 'lat': ${String(r.lat)}`)
  }
  if (typeof r.lng !== 'number' || r.lng < -180 || r.lng > 180) {
    throw new Error(`Dataset point at index ${index} has invalid 'lng': ${String(r.lng)}`)
  }

  return {
    id: r.id,
    name: r.name,
    lat: r.lat,
    lng: r.lng,
    value: typeof r.value === 'number' ? r.value : undefined,
    category: typeof r.category === 'string' ? r.category : undefined,
    meta: typeof r.meta === 'object' && r.meta !== null
      ? (r.meta as Record<string, unknown>)
      : undefined,
  }
}

/**
 * Normalize a raw Dataset.
 * - Validates each point
 * - Fills missing `value` with 0.5 (neutral)
 * - Computes min/max and normalizedValue for each point
 */
export function normalizeDataset(dataset: Dataset): NormalizedDataset {
  const points = dataset.points.map((p, i) => validatePoint(p, i))

  const values = points.map((p) => p.value ?? 0.5)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const range = maxValue - minValue || 1

  const normalized: NormalizedDataPoint[] = points.map((p, i) => ({
    ...p,
    value: values[i],
    normalizedValue: (values[i] - minValue) / range,
  }))

  return {
    id: dataset.id,
    name: dataset.name,
    points: normalized,
    minValue,
    maxValue,
  }
}
