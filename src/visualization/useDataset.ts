import { useEffect } from 'react'
import { useVisualizationStore } from './visualizationStore'
import { normalizeDataset } from './datasetUtils'
import type { Dataset } from './types'

/**
 * Load a Dataset into the visualization store, normalizing it on mount.
 * Safe to call multiple times — replaces the previous dataset each time.
 */
export function useDataset(dataset: Dataset): void {
  const setDataset = useVisualizationStore((s) => s.setDataset)

  useEffect(() => {
    const normalized = normalizeDataset(dataset)
    setDataset(normalized)
  }, [dataset, setDataset])
}
