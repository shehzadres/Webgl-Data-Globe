import { memo } from 'react'
import { useDirectorStore } from '@/director'
import styles from './SceneOverlay.module.css'

const SCENE_CONTENT: Record<string, { title: string; subtitle: string }> = {
  intro:     { title: 'Globe3D',             subtitle: 'Interactive Earth Visualization' },
  markers:   { title: 'World Cities',        subtitle: '25 major cities — population data' },
  routes:    { title: 'Flight Networks',     subtitle: '35 intercontinental routes' },
  particles: { title: 'Space Environment',   subtitle: 'Orbital particles & star field' },
  final:     { title: 'Full Visualization',  subtitle: 'Explore the connected world' },
}

export const SceneOverlay = memo(() => {
  const { currentScene } = useDirectorStore()
  const content = SCENE_CONTENT[currentScene]

  return (
    <div className={styles.container} key={currentScene}>
      <div className={styles.content}>
        <h2 className={styles.title}>{content.title}</h2>
        <p className={styles.subtitle}>{content.subtitle}</p>
      </div>
    </div>
  )
})

SceneOverlay.displayName = 'SceneOverlay'
