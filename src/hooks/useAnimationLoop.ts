import { useRef, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import type { RootState } from '@react-three/fiber'

type TickCallback = (state: RootState, delta: number) => void

export function useAnimationLoop(callback: TickCallback, priority = 0) {
  const callbackRef = useRef<TickCallback>(callback)
  callbackRef.current = callback

  const stableCallback = useCallback(
    (state: RootState, delta: number) => {
      callbackRef.current(state, delta)
    },
    [],
  )

  useFrame(stableCallback, priority)
}
