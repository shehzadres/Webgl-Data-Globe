import { memo, useCallback } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useSettingsStore } from '@/ui/settings/settingsStore'
import { useCameraStore, resetCamera } from '@/camera'
import { Tooltip } from '@/ui/tooltips/Tooltip'
import styles from './ControlPanel.module.css'

// ── Toggle row ────────────────────────────────────────────────────────────────
interface ToggleRowProps {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
  tooltip?: string
}

const ToggleRow = memo(({ label, checked, onChange, tooltip }: ToggleRowProps) => {
  const content = (
    <label className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        className={`${styles.toggle} ${checked ? styles.on : ''}`}
        onClick={() => onChange(!checked)}
        aria-label={`Toggle ${label}`}
      >
        <span className={styles.thumb} />
      </button>
    </label>
  )
  return tooltip ? <Tooltip content={tooltip} placement="left">{content}</Tooltip> : content
})
ToggleRow.displayName = 'ToggleRow'

// ── Main panel ────────────────────────────────────────────────────────────────
export const ControlPanel = memo(() => {
  const panelOpen = useSettingsStore((s) => s.ui.panelOpen)
  const { togglePanel } = useSettingsStore()
  const visualization = useSettingsStore((s) => s.visualization)
  const { setVisualization } = useSettingsStore()
  const { setAutoRotate, setAutoRotateSpeed } = useCameraStore()

  const { autoRotate, rotateSpeed, showMarkers, showRoutes,
    showParticles, showAtmosphere, showClouds } = visualization

  const toggle = useCallback((key: keyof typeof visualization) => (v: boolean) => {
    setVisualization({ [key]: v })
    // Sync camera store for auto-rotate
    if (key === 'autoRotate') setAutoRotate(v)
  }, [setVisualization, setAutoRotate])

  // Panel slide spring
  const panelSpring = useSpring({
    translateX: panelOpen ? 0 : 260,
    opacity: panelOpen ? 1 : 0,
    config: { tension: 280, friction: 30 },
  })

  // Tab spring — button moves with panel
  const tabSpring = useSpring({
    translateX: panelOpen ? 0 : 0,
    config: { tension: 280, friction: 30 },
  })

  return (
    <>
      {/* Panel toggle tab */}
      <animated.button
        className={styles.tab}
        style={tabSpring}
        onClick={togglePanel}
        aria-label={panelOpen ? 'Close control panel' : 'Open control panel'}
        aria-expanded={panelOpen}
      >
        <span className={styles.tabIcon}>{panelOpen ? '›' : '‹'}</span>
      </animated.button>

      {/* Side panel */}
      <animated.aside
        className={styles.panel}
        style={panelSpring}
        aria-label="Visualization controls"
        aria-hidden={!panelOpen}
      >
        <div className={styles.header}>
          <span className={styles.title}>Controls</span>
          <button className={styles.close} onClick={togglePanel} aria-label="Close">×</button>
        </div>

        <section className={styles.section}>
          <span className={styles.sectionTitle}>Globe</span>
          <ToggleRow label="Auto Rotate"  checked={autoRotate}    onChange={toggle('autoRotate')} tooltip="Enable globe auto-rotation" />
          <ToggleRow label="Atmosphere"   checked={showAtmosphere} onChange={toggle('showAtmosphere')} />
          <ToggleRow label="Clouds"       checked={showClouds}     onChange={toggle('showClouds')} />
          <label className={styles.row}>
            <span className={styles.rowLabel}>Rotate Speed</span>
            <input
              type="range"
              className={styles.slider}
              min={0} max={0.3} step={0.01}
              value={rotateSpeed}
              onChange={(e) => {
                const v = parseFloat(e.target.value)
                setVisualization({ rotateSpeed: v })
                setAutoRotateSpeed(v)
              }}
              aria-label="Rotation speed"
            />
          </label>
        </section>

        <section className={styles.section}>
          <span className={styles.sectionTitle}>Data Layers</span>
          <ToggleRow label="City Markers" checked={showMarkers}   onChange={toggle('showMarkers')} />
          <ToggleRow label="Flight Routes" checked={showRoutes}   onChange={toggle('showRoutes')} />
          <ToggleRow label="Particles"    checked={showParticles} onChange={toggle('showParticles')} />
        </section>

        <section className={styles.section}>
          <span className={styles.sectionTitle}>Camera</span>
          <button className={styles.btn} onClick={() => resetCamera()} aria-label="Reset camera to default view">
            Reset View
          </button>
        </section>
      </animated.aside>
    </>
  )
})

ControlPanel.displayName = 'ControlPanel'
