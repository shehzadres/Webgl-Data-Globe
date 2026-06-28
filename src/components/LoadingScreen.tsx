import { memo } from 'react'
import { useSpring, animated } from '@react-spring/web'
import styles from './LoadingScreen.module.css'

interface LoadingScreenProps {
  progress: number   // [0, 1]
  isReady: boolean
}

export const LoadingScreen = memo(({ progress, isReady }: LoadingScreenProps) => {
  const spring = useSpring({
    opacity: isReady ? 0 : 1,
    config: { duration: 800 },
    delay: isReady ? 200 : 0,
  })

  if (isReady && spring.opacity.get() === 0) return null

  return (
    <animated.div className={styles.screen} style={spring} aria-label="Loading" role="status">
      <div className={styles.brand}>
        <span className={styles.label}>GLOBE</span>
        <span className={styles.sub}>3D</span>
      </div>

      <div className={styles.progressWrap} aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100} role="progressbar">
        <div className={styles.bar}>
          <div className={styles.fill} style={{ width: `${progress * 100}%` }} />
        </div>
        <span className={styles.pct}>{Math.round(progress * 100)}%</span>
      </div>

      <p className={styles.hint}>Loading Earth textures…</p>
    </animated.div>
  )
})

LoadingScreen.displayName = 'LoadingScreen'
