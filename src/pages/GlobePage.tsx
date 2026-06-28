import { memo, useEffect, useRef } from 'react'
import { GlobeCanvas } from '@/components/canvas/GlobeCanvas'
import { LoadingScreen } from '@/components/LoadingScreen'
import { DebugPanel } from '@/components/debug/DebugPanel'
import { DataInfoPanel } from '@/visualization'
import { RouteInfoPanel, useRouteDataset, FLIGHT_ROUTES_DATASET } from '@/routes'
import { useRouteCameraFocus } from '@/routes/useRouteCameraFocus'
import { useStats } from '@/hooks/useStats'
import { useAppStore } from '@/stores/appStore'
import { useDataset, WORLD_CITIES_DATASET } from '@/visualization'
import { useScrollDirector } from '@/director'
import { SceneIndicator } from '@/director/ui/SceneIndicator'
import { SceneOverlay } from '@/director/ui/SceneOverlay'
import { ScrollHint } from '@/director/ui/ScrollHint'
import { HUD, SearchPanel, ControlPanel, TopBar } from '@/ui'
import { useEarthTextures } from '@/hooks/useEarthTextures'
import styles from './GlobePage.module.css'

const SCROLL_HEIGHT = '500vh'

export const GlobePage = memo(() => {
  const { isDebugMode, setReady } = useAppStore()
  const scrollRef = useRef<HTMLDivElement>(null)
  const { progress, isLoading } = useEarthTextures()

  useStats(isDebugMode)
  useDataset(WORLD_CITIES_DATASET)
  useRouteDataset(FLIGHT_ROUTES_DATASET)
  useRouteCameraFocus()
  useScrollDirector(scrollRef)

  useEffect(() => {
    if (!isLoading) setReady(true)
  }, [isLoading, setReady])

  return (
    <div className={styles.page}>
      <LoadingScreen progress={progress} isReady={!isLoading} />

      <GlobeCanvas className={styles.canvas} />

      <div
        id="scroll-container"
        ref={scrollRef}
        className={styles.scrollContainer}
        style={{ height: SCROLL_HEIGHT }}
      />

      <TopBar />
      <HUD />
      <SceneIndicator />
      <SceneOverlay />
      <ScrollHint />
      <SearchPanel />
      <ControlPanel />
      <DataInfoPanel />
      <RouteInfoPanel />
      <DebugPanel />
    </div>
  )
})

GlobePage.displayName = 'GlobePage'
