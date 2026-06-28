import { memo, useCallback } from 'react'
import { useDirectorStore, SCENE_CONFIGS, activateScene } from '@/director'
import type { SceneId } from '@/director'
import styles from './SceneIndicator.module.css'

export const SceneIndicator = memo(() => {
  const { currentScene, scrollProgress } = useDirectorStore()

  const handleClick = useCallback((id: SceneId, index: number) => {
    const scrollEl = document.getElementById('scroll-container')
    if (scrollEl) {
      const target = (index / (SCENE_CONFIGS.length - 1)) * scrollEl.scrollHeight
      scrollEl.scrollTo({ top: target, behavior: 'smooth' })
    }
    activateScene(id)
  }, [])

  return (
    <nav className={styles.nav} aria-label="Scene navigation">
      {SCENE_CONFIGS.map((config, i) => (
        <button
          key={config.id}
          className={`${styles.dot} ${currentScene === config.id ? styles.active : ''}`}
          onClick={() => handleClick(config.id, i)}
          aria-label={`Go to: ${config.label}`}
          title={config.label}
        />
      ))}
      <div
        className={styles.progress}
        style={{ transform: `scaleY(${scrollProgress})` }}
      />
    </nav>
  )
})

SceneIndicator.displayName = 'SceneIndicator'
