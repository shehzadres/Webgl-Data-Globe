import { memo } from 'react'
import { useDirectorStore, SCENE_CONFIGS } from '@/director'
import { useSettingsStore } from '@/ui/settings/settingsStore'
import styles from './HUD.module.css'

export const HUD = memo(() => {
  const { currentScene, scrollProgress } = useDirectorStore()
  const { showHUD } = useSettingsStore((s) => s.ui)

  if (!showHUD) return null

  const sceneLabel = SCENE_CONFIGS.find((c) => c.id === currentScene)?.label ?? currentScene

  return (
    <div className={styles.hud} role="status" aria-live="polite">
      <div className={styles.row}>
        <span className={styles.key}>SCENE</span>
        <span className={styles.value}>{sceneLabel.toUpperCase()}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.key}>DATASET</span>
        <span className={styles.value}>WORLD CITIES</span>
      </div>
      <div className={styles.row}>
        <span className={styles.key}>PROGRESS</span>
        <span className={styles.value}>{Math.round(scrollProgress * 100)}%</span>
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
    </div>
  )
})

HUD.displayName = 'HUD'
