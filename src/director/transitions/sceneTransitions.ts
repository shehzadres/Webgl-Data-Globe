import type { SceneId } from '@/director/directorStore'
import type { CameraTarget } from '@/camera'

export interface SceneTransition {
  camera: Partial<CameraTarget>
  cameraDuration: number
  cameraEase: string
  autoRotateSpeed: number
}

export const SCENE_TRANSITIONS: Record<SceneId, SceneTransition> = {
  intro: {
    camera: { radius: 4.2, phi: Math.PI / 2, theta: 0 },
    cameraDuration: 2.0,
    cameraEase: 'power2.inOut',
    autoRotateSpeed: 0.06,
  },
  markers: {
    camera: { radius: 2.8, phi: Math.PI / 2.2, theta: 0.3 },
    cameraDuration: 1.6,
    cameraEase: 'power2.inOut',
    autoRotateSpeed: 0.04,
  },
  routes: {
    camera: { radius: 3.8, phi: Math.PI / 2.4, theta: -0.5 },
    cameraDuration: 1.8,
    cameraEase: 'power3.inOut',
    autoRotateSpeed: 0.03,
  },
  particles: {
    camera: { radius: 5.5, phi: Math.PI / 2.8, theta: 0.8 },
    cameraDuration: 2.0,
    cameraEase: 'power2.inOut',
    autoRotateSpeed: 0.05,
  },
  final: {
    camera: { radius: 3.2, phi: Math.PI / 2.1, theta: 0 },
    cameraDuration: 2.2,
    cameraEase: 'power3.inOut',
    autoRotateSpeed: 0.04,
  },
}
