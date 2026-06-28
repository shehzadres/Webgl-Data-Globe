import { memo, useEffect } from 'react'
import { useControls, button, folder, Leva } from 'leva'
import { useAppStore } from '@/stores/appStore'
import { useCameraStore, animateToPreset, resetCamera } from '@/camera'
import { useParticleStore } from '@/particles'

export const DebugPanel = memo(() => {
  const { isDebugMode } = useAppStore()
  const { setAutoRotate, setAutoRotateSpeed } = useCameraStore()
  const { setStars, setOrbits, setDust } = useParticleStore()

  // ── Camera ─────────────────────────────────────────────────────────────────
  const { autoRotate, autoRotateSpeed } = useControls(
    'Camera',
    {
      autoRotate:      { value: true, label: 'Auto Rotate' },
      autoRotateSpeed: { value: 0.08, min: 0, max: 0.5, step: 0.005, label: 'Rotate Speed' },
      'Reset Camera':  button(() => resetCamera()),
      'Close View':    button(() => animateToPreset('close')),
      'Far View':      button(() => animateToPreset('far')),
      'Top View':      button(() => animateToPreset('top')),
    },
    { collapsed: true },
  )

  useEffect(() => { setAutoRotate(autoRotate) },           [autoRotate, setAutoRotate])
  useEffect(() => { setAutoRotateSpeed(autoRotateSpeed) }, [autoRotateSpeed, setAutoRotateSpeed])

  // ── Particles ──────────────────────────────────────────────────────────────
  const pv = useControls(
    'Particles',
    {
      Stars: folder({
        starsVisible: { value: true,  label: 'Visible' },
        starsSize:    { value: 0.8,   min: 0.2, max: 3.0, step: 0.1,  label: 'Size' },
        starsSpeed:   { value: 0.3,   min: 0,   max: 2.0, step: 0.05, label: 'Speed' },
      }),
      Orbits: folder({
        orbitsVisible: { value: true, label: 'Visible' },
        orbitsSize:    { value: 1.2,  min: 0.5, max: 4.0, step: 0.1, label: 'Size' },
        orbitsSpeed:   { value: 1.0,  min: 0,   max: 4.0, step: 0.1, label: 'Speed' },
      }),
      Dust: folder({
        dustVisible: { value: true, label: 'Visible' },
        dustSize:    { value: 0.5,  min: 0.1, max: 2.0, step: 0.1,  label: 'Size' },
        dustSpeed:   { value: 0.15, min: 0,   max: 1.0, step: 0.05, label: 'Speed' },
      }),
    },
    { collapsed: true },
  )

  useEffect(() => { setStars({ visible: pv.starsVisible,   size: pv.starsSize,   speed: pv.starsSpeed })  },
    [pv.starsVisible, pv.starsSize, pv.starsSpeed, setStars])
  useEffect(() => { setOrbits({ visible: pv.orbitsVisible, size: pv.orbitsSize,  speed: pv.orbitsSpeed }) },
    [pv.orbitsVisible, pv.orbitsSize, pv.orbitsSpeed, setOrbits])
  useEffect(() => { setDust({ visible: pv.dustVisible,     size: pv.dustSize,    speed: pv.dustSpeed })   },
    [pv.dustVisible, pv.dustSize, pv.dustSpeed, setDust])

  return <Leva hidden={!isDebugMode} collapsed={false} />
})

DebugPanel.displayName = 'DebugPanel'
