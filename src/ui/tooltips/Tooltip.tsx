import { memo, useState, useCallback, useRef, type ReactNode } from 'react'
import { useSpring, animated } from '@react-spring/web'
import styles from './Tooltip.module.css'

interface TooltipProps {
  content: string
  children: ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

export const Tooltip = memo(({ content, children, placement = 'top' }: TooltipProps) => {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const spring = useSpring({
    opacity: visible ? 1 : 0,
    scale:   visible ? 1 : 0.88,
    config: { tension: 340, friction: 26 },
  })

  const show = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setVisible(true), 120)
  }, [])

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setVisible(false)
  }, [])

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      <animated.div
        className={`${styles.tooltip} ${styles[placement]}`}
        style={{ opacity: spring.opacity, scale: spring.scale }}
        role="tooltip"
        aria-hidden={!visible}
      >
        {content}
      </animated.div>
    </div>
  )
})

Tooltip.displayName = 'Tooltip'
