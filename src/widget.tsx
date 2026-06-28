import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GlobeCanvas } from './components/canvas/GlobeCanvas'
import { ErrorBoundary } from './components/ErrorBoundary'
import './styles/global.css'

interface GlobeWidgetOptions {
  /** Target element id or HTMLElement to mount into */
  container: string | HTMLElement
  /** Width of the canvas (default: 100%) */
  width?: string
  /** Height of the canvas (default: 100%) */
  height?: string
  /** Enable auto-rotation (default: true) */
  autoRotate?: boolean
}

/**
 * Globe3D Embeddable Widget
 *
 * @example
 * ```html
 * <div id="globe-widget" style="width:600px;height:400px;"></div>
 * <script type="module">
 *   import { Globe3DWidget } from './widget.js'
 *   Globe3DWidget.mount({ container: 'globe-widget', autoRotate: true })
 * </script>
 * ```
 */
export const Globe3DWidget = {
  mount(options: GlobeWidgetOptions): { unmount: () => void } {
    const { container, width = '100%', height = '100%' } = options

    const el = typeof container === 'string'
      ? document.getElementById(container)
      : container

    if (!el) throw new Error(`Globe3DWidget: container "${String(container)}" not found`)

    el.style.position = 'relative'
    el.style.width    = width
    el.style.height   = height

    const root = createRoot(el)
    root.render(
      <StrictMode>
        <ErrorBoundary>
          <GlobeCanvas style={{ width: '100%', height: '100%' }} />
        </ErrorBoundary>
      </StrictMode>,
    )

    return {
      unmount: () => root.unmount(),
    }
  },
}

// Auto-mount if data attribute present on any div
document.querySelectorAll<HTMLElement>('[data-globe3d]').forEach((el) => {
  Globe3DWidget.mount({ container: el })
})
