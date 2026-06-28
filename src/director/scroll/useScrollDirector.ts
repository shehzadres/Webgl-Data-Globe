import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useDirectorStore, SCENE_CONFIGS } from '@/director'
import { activateScene } from '@/director/scenes/sceneActivator'
import type { SceneId } from '@/director'

gsap.registerPlugin(ScrollTrigger)

export function useScrollDirector(containerRef: React.RefObject<HTMLDivElement | null>): void {
  const triggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const { reducedMotion } = useDirectorStore.getState()

    if (reducedMotion) {
      activateScene('final')
      return
    }

    activateScene('intro')

    triggerRef.current = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      onUpdate: (self) => {
        const progress = self.progress
        useDirectorStore.getState().setScrollProgress(progress)

        let activeId: SceneId = 'intro'
        for (const config of SCENE_CONFIGS) {
          if (progress >= config.threshold) {
            activeId = config.id
          }
        }

        const current = useDirectorStore.getState().currentScene
        if (current !== activeId) {
          activateScene(activeId)
        }
      },
    })

    return () => {
      triggerRef.current?.kill()
      triggerRef.current = null
    }
  }, [containerRef])
}
