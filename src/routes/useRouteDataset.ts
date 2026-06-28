import { useEffect } from 'react'
import { useRouteStore } from './routeStore'
import type { RouteDataset } from './routeTypes'

export function useRouteDataset(dataset: RouteDataset): void {
  const setDataset = useRouteStore((s) => s.setDataset)

  useEffect(() => {
    setDataset(dataset)
  }, [dataset, setDataset])
}
