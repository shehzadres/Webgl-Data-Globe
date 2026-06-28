import { memo } from 'react'
import { SceneLighting } from '@/systems/SceneLighting'
import { Earth } from '@/components/canvas/Earth'
import { CloudLayer } from '@/components/canvas/CloudLayer'
import { Atmosphere } from '@/components/canvas/Atmosphere'
import { GlowRing } from '@/components/canvas/GlowRing'
import { NoiseOverlay } from '@/components/canvas/NoiseOverlay'
import { LoadingIndicator } from '@/components/canvas/LoadingIndicator'
import { CameraController } from '@/camera'
import { useEarthTextures } from '@/hooks/useEarthTextures'
import { MarkerLayer, SpikeLayer, LabelLayer } from '@/visualization'
import { RouteLayer } from '@/routes'
import { ParticleEngine } from '@/particles'
import { ShaderManager } from '@/shaders'
import { useDirectorStore } from '@/director'
import { useSettingsStore } from '@/ui'

export const Scene = memo(() => {
  const { textures, isLoading, progress, error } = useEarthTextures()
  const { markersVisible, routesVisible } = useDirectorStore()
  const { showMarkers, showRoutes, showParticles, showAtmosphere, showClouds, showNoise } =
    useSettingsStore((s) => s.visualization)

  return (
    <>
      <ShaderManager />
      <CameraController />
      <SceneLighting />
      {showParticles && <ParticleEngine />}

      {isLoading || error ? (
        <LoadingIndicator progress={progress} error={error} />
      ) : (
        textures && (
          <>
            <Earth textures={textures} />
            {showNoise && <NoiseOverlay />}
            {showClouds && <CloudLayer textures={textures} />}
            {showAtmosphere && <Atmosphere />}
            <GlowRing />

            {markersVisible && showMarkers && (
              <>
                <MarkerLayer />
                <SpikeLayer />
                <LabelLayer />
              </>
            )}

            {routesVisible && showRoutes && <RouteLayer />}
          </>
        )
      )}
    </>
  )
})

Scene.displayName = 'Scene'
