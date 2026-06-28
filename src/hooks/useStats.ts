import { useEffect, useRef } from 'react'
import Stats from 'stats.js'

export function useStats(enabled = true) {
  const statsRef = useRef<Stats | null>(null)

  useEffect(() => {
    if (!enabled) return

    const stats = new Stats()
    stats.showPanel(0)
    stats.dom.style.position = 'fixed'
    stats.dom.style.top = '0px'
    stats.dom.style.left = '0px'
    stats.dom.style.zIndex = '9999'
    document.body.appendChild(stats.dom)
    statsRef.current = stats

    let frameId: number

    const animate = () => {
      stats.begin()
      stats.end()
      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameId)
      if (stats.dom.parentNode) {
        stats.dom.parentNode.removeChild(stats.dom)
      }
      statsRef.current = null
    }
  }, [enabled])

  return statsRef
}
