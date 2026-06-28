import { memo, useCallback } from 'react'
import { useSettingsStore } from '@/ui/settings/settingsStore'
import { Tooltip } from '@/ui/tooltips/Tooltip'
import { activateScene } from '@/director'
import { resetCamera } from '@/camera'
import styles from './TopBar.module.css'

export const TopBar = memo(() => {
  const { toggleSearch, setUI } = useSettingsStore()
  const ui = useSettingsStore((s) => s.ui)

  const handleHome = useCallback(() => {
    activateScene('intro')
    resetCamera()
  }, [])

  return (
    <header className={styles.bar} role="banner">
      {/* Brand */}
      <div className={styles.brand}>
        <Tooltip content="Return to introduction" placement="bottom">
          <button className={styles.homeBtn} onClick={handleHome} aria-label="Home — return to introduction">
            <span className={styles.brandLabel}>GLOBE</span>
            <span className={styles.brandSub}>3D</span>
          </button>
        </Tooltip>
      </div>

      {/* Actions */}
      <nav className={styles.actions} aria-label="Toolbar">
        <Tooltip content="Search locations" placement="bottom">
          <button
            className={`${styles.action} ${ui.showSearch ? styles.active : ''}`}
            onClick={toggleSearch}
            aria-label="Search locations"
            aria-expanded={ui.showSearch}
          >
            ⌕
          </button>
        </Tooltip>

        <Tooltip content={ui.showHUD ? 'Hide HUD' : 'Show HUD'} placement="bottom">
          <button
            className={`${styles.action} ${ui.showHUD ? styles.active : ''}`}
            onClick={() => setUI({ showHUD: !ui.showHUD })}
            aria-label="Toggle HUD"
            aria-pressed={ui.showHUD}
          >
            ◈
          </button>
        </Tooltip>

        <div className={styles.status}>
          <span className={styles.dot} aria-hidden />
          <span className={styles.statusText}>Live</span>
        </div>
      </nav>
    </header>
  )
})

TopBar.displayName = 'TopBar'
