import { animateCameraTo } from '@/camera'
import { useCameraStore } from '@/camera'
import { useDirectorStore, SCENE_TRANSITIONS } from '@/director'
import type { SceneId } from '@/director'

/**
 * Activate a scene: update director store + camera.
 * Called by the scroll system and navigation buttons.
 */
export function activateScene(id: SceneId): void {
  const director  = useDirectorStore.getState()
  const transition = SCENE_TRANSITIONS[id]

  if (director.currentScene === id) return

  director.setScene(id)

  // Camera transition
  if (!director.reducedMotion) {
    animateCameraTo(
      transition.camera,
      transition.cameraDuration,
      transition.cameraEase,
    )
  } else {
    // Instant update for reduced-motion users
    useCameraStore.getState().setTarget({
      ...useCameraStore.getState().target,
      ...transition.camera,
    })
  }

  // Update camera auto-rotate speed
  useCameraStore.getState().setAutoRotateSpeed(transition.autoRotateSpeed)

  // Reveal layers progressively
  switch (id) {
    case 'intro':
      director.setMarkersVisible(false)
      director.setRoutesVisible(false)
      director.setParticlesVisible(false)
      break
    case 'markers':
      director.setMarkersVisible(true)
      director.setRoutesVisible(false)
      director.setParticlesVisible(false)
      break
    case 'routes':
      director.setMarkersVisible(true)
      director.setRoutesVisible(true)
      director.setParticlesVisible(false)
      break
    case 'particles':
      director.setMarkersVisible(true)
      director.setRoutesVisible(true)
      director.setParticlesVisible(true)
      break
    case 'final':
      director.setMarkersVisible(true)
      director.setRoutesVisible(true)
      director.setParticlesVisible(true)
      break
  }
}
