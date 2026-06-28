import { useEffect, useRef, useCallback } from 'react'
import { useCameraStore } from './cameraStore'
import { clampTarget } from './cameraUtils'
import { interruptAnimation } from './cameraAnimations'
import { CAMERA_CONSTRAINTS } from './cameraPresets'

const ROTATE_SPEED = 0.005   // radians per pixel
const ZOOM_SPEED   = 0.008   // radius per pixel of wheel delta
const RESUME_DELAY = 1200    // ms before auto-rotate resumes

interface PointerState {
  active: boolean
  startX: number
  startY: number
  lastX: number
  lastY: number
  // For pinch zoom
  pinchDist: number
}

export function useCameraInput(domElement: HTMLElement | null): void {
  const ptr = useRef<PointerState>({
    active: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    pinchDist: 0,
  })
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const startInteraction = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
    interruptAnimation()
    useCameraStore.getState().setUserInteracting(true)
  }, [])

  const endInteraction = useCallback(() => {
    ptr.current.active = false
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => {
      useCameraStore.getState().setUserInteracting(false)
    }, RESUME_DELAY)
  }, [])

  const applyDelta = useCallback((dTheta: number, dPhi: number) => {
    const store = useCameraStore.getState()
    const next = clampTarget({
      radius: store.target.radius,
      phi: store.target.phi + dPhi,
      theta: store.target.theta - dTheta,
    })
    store.setTarget(next)
  }, [])

  const applyZoom = useCallback((delta: number) => {
    const store = useCameraStore.getState()
    const next = clampTarget({
      ...store.target,
      radius: store.target.radius + delta,
    })
    store.setTarget(next)
  }, [])

  useEffect(() => {
    const el = domElement
    if (!el) return

    // ─── Mouse ───────────────────────────────────────────────────────────────
    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return
      startInteraction()
      ptr.current.active = true
      ptr.current.lastX = e.clientX
      ptr.current.lastY = e.clientY
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!ptr.current.active) return
      const dx = e.clientX - ptr.current.lastX
      const dy = e.clientY - ptr.current.lastY
      ptr.current.lastX = e.clientX
      ptr.current.lastY = e.clientY
      applyDelta(dx * ROTATE_SPEED, dy * ROTATE_SPEED)
    }

    const onMouseUp = () => {
      if (!ptr.current.active) return
      endInteraction()
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      startInteraction()
      applyZoom(e.deltaY * ZOOM_SPEED)
      endInteraction()
    }

    // ─── Touch ───────────────────────────────────────────────────────────────
    const getTouchDist = (touches: TouchList): number => {
      const dx = touches[0].clientX - touches[1].clientX
      const dy = touches[0].clientY - touches[1].clientY
      return Math.sqrt(dx * dx + dy * dy)
    }

    const onTouchStart = (e: TouchEvent) => {
      startInteraction()
      ptr.current.active = true
      if (e.touches.length === 1) {
        ptr.current.lastX = e.touches[0].clientX
        ptr.current.lastY = e.touches[0].clientY
      } else if (e.touches.length === 2) {
        ptr.current.pinchDist = getTouchDist(e.touches)
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      if (!ptr.current.active) return

      if (e.touches.length === 1) {
        const dx = e.touches[0].clientX - ptr.current.lastX
        const dy = e.touches[0].clientY - ptr.current.lastY
        ptr.current.lastX = e.touches[0].clientX
        ptr.current.lastY = e.touches[0].clientY
        applyDelta(dx * ROTATE_SPEED, dy * ROTATE_SPEED)
      } else if (e.touches.length === 2) {
        const dist = getTouchDist(e.touches)
        const delta = (ptr.current.pinchDist - dist) * 0.012
        ptr.current.pinchDist = dist
        applyZoom(delta)
      }
    }

    const onTouchEnd = () => endInteraction()

    el.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd)
    el.addEventListener('touchcancel', onTouchEnd)

    return () => {
      el.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchEnd)
      if (resumeTimer.current) clearTimeout(resumeTimer.current)
    }
  }, [domElement, startInteraction, endInteraction, applyDelta, applyZoom])
}

/** Constraint constants re-exported for consumers. */
export { CAMERA_CONSTRAINTS }
