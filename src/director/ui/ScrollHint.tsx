import { memo } from 'react'
import { useDirectorStore } from '@/director'
import styles from './ScrollHint.module.css'

export const ScrollHint = memo(() => {
  const { currentScene } = useDirectorStore()
  if (currentScene !== 'intro') return null

  return (
    <div className={styles.hint} aria-label="Scroll to explore">
      <span className={styles.label}>Scroll to explore</span>
      <div className={styles.chevron} />
      <div className={styles.chevron} />
    </div>
  )
})

ScrollHint.displayName = 'ScrollHint'
