# Globe3D Architecture

## High-Level Overview

```
                        Globe3D
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
  Scene Director     Camera Engine       UI Layer
        │                  │                  │
        └──────────────────┼──────────────────┘
                           ▼
                   Rendering Engine
                           │
      ┌────────────┬────────────┬────────────┐
      ▼            ▼            ▼            ▼
    Earth       Routes      Particles     Shaders
                           │
                           ▼
                   Visualization Layer
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
           Markers                   Labels
```

---

# Rendering Pipeline

1. React initializes the application.
2. React Three Fiber creates the WebGL renderer.
3. Scene Director manages the active scene.
4. Camera Engine updates camera position.
5. Visualization Engine updates geographic objects.
6. Particle Engine updates particle systems.
7. Shader Manager updates shared uniforms.
8. Three.js renders the final frame.

---

# Core Systems

## Scene Director

Responsible for:

- Scene progression
- Scroll synchronization
- Camera transitions
- Animation coordination
- Visibility management

---

## Camera Engine

Responsible for:

- Spherical-coordinate movement
- Zoom
- Rotation
- Camera damping
- Preset transitions

---

## Visualization Engine

Responsible for:

- Geographic coordinate conversion
- Marker generation
- Spike visualization
- Labels
- Dataset rendering

---

## Route Engine

Responsible for:

- Great-circle interpolation
- Arc generation
- Animated route rendering
- Traveling particles

---

## Particle Engine

Responsible for:

- Star field
- Orbital particles
- Ambient particles
- Shared geometry
- Efficient updates

---

## Shader Framework

Responsible for:

- Atmosphere shader
- Glow shader
- Noise shader
- Shared GLSL utilities
- Uniform management

---

## UI Layer

Responsible for:

- HUD
- Search
- Control panel
- Tooltips
- Information panels

---

# Data Flow

```
Dataset
   │
   ▼
Geo Utilities
   │
   ▼
Visualization Engine
   │
   ▼
Three.js Objects
   │
   ▼
GPU Rendering
```

---

# Performance Strategy

The project is optimized for Intel Iris Xe Graphics.

Key optimizations include:

- BufferGeometry particle systems
- Shared shader uniforms
- Cached texture loading
- Geometry reuse
- Material reuse
- Adaptive device pixel ratio
- Zero per-frame heap allocations
- Draw-range route animation
- Memoized React components
- Centralized state management

---

# Folder Responsibilities

| Folder | Responsibility |
|---------|----------------|
| camera | Camera engine |
| director | Scene Director |
| particles | Particle engine |
| routes | Great-circle routing |
| shaders | GLSL framework |
| ui | Interface components |
| visualization | Geographic visualization |
| systems | Rendering systems |
| hooks | Shared React hooks |
| stores | Global state |
| utils | Shared utilities |

---

# Design Principles

- Modular architecture
- Separation of concerns
- GPU-first rendering
- Reusable rendering systems
- Maintainable shader framework
- Scalable project organization
- Performance-oriented implementation
- Production-ready code quality