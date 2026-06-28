// Timeline registry for coordinating GSAP timelines across the Scene Director.
// Callers pass gsap.core.Timeline instances — no direct gsap import needed here.

type AnyTimeline = { pause(): void; kill(): void }

interface RegisteredTimeline {
  id: string
  tl: AnyTimeline
}

const registry = new Map<string, RegisteredTimeline>()

export const timelineManager = {
  register<T extends AnyTimeline>(id: string, tl: T): T {
    registry.set(id, { id, tl })
    return tl
  },
  get(id: string): AnyTimeline | undefined {
    return registry.get(id)?.tl
  },
  pauseAll(): void {
    registry.forEach(({ tl }) => tl.pause())
  },
  killAll(): void {
    registry.forEach(({ tl }) => tl.kill())
    registry.clear()
  },
  kill(id: string): void {
    const entry = registry.get(id)
    if (entry) {
      entry.tl.kill()
      registry.delete(id)
    }
  },
}
