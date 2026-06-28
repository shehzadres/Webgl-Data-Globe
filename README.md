# Globe3D — WebGL-Powered 3D Earth Data Visualization

> Production-quality interactive 3D globe built with React 18, Three.js, and custom GLSL shaders. A cinematic, scroll-driven storytelling experience with geospatial data visualization, flight route animation, particle systems, and a fully custom camera engine.

---

## Live Demo

Deploy your own in minutes — see [Deployment](#deployment) below.

---

## Features

- **Realistic Earth** — 2048×1024 day/night texture compositing, specular ocean maps, normal-mapped terrain, GLSL atmosphere shader
- **Cinematic Camera** — custom spherical-coordinate camera, GSAP-driven transitions, smooth-damp interpolation, 5 named presets
- **Scroll Storytelling** — GSAP ScrollTrigger drives a 5-scene cinematic progression revealing layers progressively
- **Data Visualization** — 25 world cities with animated sphere markers, value-driven spike charts, billboard labels
- **Flight Routes** — 35 great-circle arcs with draw-range reveal animation and traveling particles
- **Particle Engine** — 3 `BufferGeometry` systems (star field, orbital rings, ambient dust) — zero per-frame allocations
- **GLSL Shader Framework** — custom atmosphere (Fresnel + sun scatter), glow, animated FBM noise, GPU star shader
- **Advanced UI** — spring-animated side panel, location search with camera focus, HUD, tooltips, scene indicator
- **Scene Director** — centralized coordinator for camera, layer visibility, and scene transitions

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript (strict) |
| Build | Vite 5 |
| 3D Rendering | Three.js + React Three Fiber |
| 3D Helpers | Drei |
| Shaders | GLSL via vite-plugin-glsl |
| Animation | GSAP 3, React Spring |
| State | Zustand |
| Debug | Leva, Stats.js |
| Routing | React Router v6 |
| Deployment | Vercel |

---

## Local Development

```bash
# 1. Clone the repository
git clone https://github.com/shehzadres/globe3d.git
cd globe3d

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript check (no emit) |
| `npm run format` | Format with Prettier |

---


## Controls

| Input | Action |
|---|---|
| Drag | Rotate globe |
| Scroll / Pinch | Zoom |
| Page scroll | Advance through scenes |
| Click marker | Select + info panel |
| Hover marker / route | Highlight + label |
| `⌕` button | Search locations |
| `‹` tab | Open control panel |
| Side dots | Jump to scene |

---

## Project Structure

```
src/
├── camera/            Spherical-coordinate camera system
├── components/
│   ├── canvas/        R3F scene — Earth, clouds, atmosphere, shaders
│   └── debug/         Leva debug panel
├── data/              Texture URL registry
├── director/          Scene Director — scroll, transitions, timeline
├── hooks/             useAnimationLoop, useEarthTextures, useStats
├── particles/         BufferGeometry particle engine
├── routes/            Great-circle arc system + flight dataset
├── shaders/           GLSL framework — 4 shader systems + shared utils
├── stores/            appStore
├── styles/            Global CSS reset
├── systems/           rendererConfig, SceneLighting
├── ui/                TopBar, HUD, ControlPanel, Search, Tooltip, theme
├── utils/             Cached texture loader
├── visualization/     Markers, spikes, labels, geo utilities, city dataset
└── widget.tsx         Embeddable widget entry point
```

---

## Embeddable Widget

```html
<div id="globe" style="width:600px;height:400px;"></div>
<script type="module">
  import { Globe3DWidget } from './src/widget.tsx'
  Globe3DWidget.mount({ container: 'globe' })
</script>
```

Or via data attribute (auto-mounts on load):

```html
<div data-globe3d style="width:100%;height:500px;"></div>
```

---

## Texture Credits

Textures load at runtime from the Three.js CDN. No binary assets are committed to this repo.

| Texture | Source | License |
|---|---|---|
| Earth day, normal, specular, night lights | NASA Visible Earth / Three.js examples | Public domain |
| Cloud alpha map | Three.js examples | Public domain |

---

## Performance

Targets Intel Iris Xe Graphics at stable 60 FPS:

- 3 draw calls for all particle systems (`BufferGeometry` Points)
- Zero per-frame heap allocations in update loops
- Single `shaderUniforms.tick()` updates all time-based GLSL materials
- `drawRange` arc reveal — no geometry rebuild
- DPR capped at 2× for mobile GPU headroom
- R3F adaptive performance floor at 0.5

---

## CI / CD

GitHub Actions runs automatically on every push to `main` and on all pull requests:

```
Install → Lint → Type Check → Build
```

See [`.github/workflows/ci.yml`](.github/workflows/ci.yml)

---

## License

MIT — see [LICENSE](LICENSE)
