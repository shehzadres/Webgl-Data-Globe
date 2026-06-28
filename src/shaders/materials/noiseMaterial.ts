import * as THREE from 'three'
import vertexShader   from '@/shaders/noise/vertex.glsl'
import fragmentShader from '@/shaders/noise/fragment.glsl'

export interface NoiseUniforms extends Record<string, THREE.IUniform<unknown>> {
  uTime:      THREE.IUniform<number>
  uSpeed:     THREE.IUniform<number>
  uScale:     THREE.IUniform<number>
  uIntensity: THREE.IUniform<number>
  uColor:     THREE.IUniform<THREE.Color>
}

export interface NoiseMaterialOptions {
  speed?:     number
  scale?:     number
  intensity?: number
  color?:     string | number
  transparent?: boolean
  side?:      THREE.Side
}

export function createNoiseMaterial(
  opts: NoiseMaterialOptions = {},
): THREE.ShaderMaterial & { uniforms: NoiseUniforms } {
  const uniforms: NoiseUniforms = {
    uTime:      { value: 0 },
    uSpeed:     { value: opts.speed     ?? 0.4 },
    uScale:     { value: opts.scale     ?? 3.0 },
    uIntensity: { value: opts.intensity ?? 0.7 },
    uColor:     { value: new THREE.Color(opts.color ?? 0x4488ff) },
  }

  const mat = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: opts.transparent ?? true,
    depthWrite:  false,
    side:        opts.side ?? THREE.FrontSide,
    blending:    THREE.AdditiveBlending,
  })

  return mat as THREE.ShaderMaterial & { uniforms: NoiseUniforms }
}
