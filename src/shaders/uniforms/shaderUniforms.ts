import * as THREE from 'three'

/** A shader material that has a uTime uniform. */
export interface TimedMaterial {
  uniforms: { uTime: THREE.IUniform<number> }
}

/** A shader material that has a uResolution uniform. */
export interface ResolutionMaterial {
  uniforms: { uResolution: THREE.IUniform<THREE.Vector2> }
}

/** Registry of all time-driven materials — updated once per frame by ShaderManager. */
const timedMaterials = new Set<TimedMaterial>()
const _resolution    = new THREE.Vector2()

export const shaderUniforms = {
  /** Register a material for per-frame time updates. Returns the material for chaining. */
  registerTimed<T extends TimedMaterial>(mat: T): T {
    timedMaterials.add(mat)
    return mat
  },

  /** Unregister (call on cleanup). */
  unregisterTimed(mat: TimedMaterial): void {
    timedMaterials.delete(mat)
  },

  /** Called once per frame by ShaderManager.useFrame. */
  tick(delta: number): void {
    for (const mat of timedMaterials) {
      mat.uniforms.uTime.value += delta
    }
  },

  /** Update resolution on all registered resolution-materials. */
  updateResolution(w: number, h: number): void {
    _resolution.set(w, h)
  },

  /** Current accumulated resolution (read-only). */
  get resolution(): THREE.Vector2 {
    return _resolution
  },
}
