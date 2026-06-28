import { create } from 'zustand'

interface AppState {
  isReady: boolean
  isDebugMode: boolean
  setReady: (ready: boolean) => void
  setDebugMode: (debug: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  isReady: false,
  isDebugMode: import.meta.env.DEV,
  setReady: (ready) => set({ isReady: ready }),
  setDebugMode: (debug) => set({ isDebugMode: debug }),
}))
