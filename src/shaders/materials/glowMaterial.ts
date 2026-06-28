import * as THREE from 'three'
import vertexShader   from '@/shaders/glow/vertex.glsl'
import fragmentShader from '@/shaders/glow/fragment.glsl'

export interface GlowUniforms extends Record<string, THREE.IUniform<unknown>> {
  uGlowColor:     THREE.IUniform<THREE.Color>
  uGlowIntensity: THREE.IUniform<number>
  uGlowFalloff:   THREE.IUniform<number>
}

export interface GlowMaterialOptions {
  color?:     string | number
  intensity?: number
  falloff?:   number
}

export function createGlowMaterial(
  opts: GlowMaterialOptions = {},
): THREE.ShaderMaterial & { uniforms: GlowUniforms } {
  const uniforms: GlowUniforms = {
    uGlowColor:     { value: new THREE.Color(opts.color     ?? 0x3a8fff) },
    uGlowIntensity: { value: opts.intensity ?? 1.0 },
    uGlowFalloff:   { value: opts.falloff   ?? 4.0 },
  }

  const mat = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    side:        THREE.BackSide,
    transparent: true,
    depthWrite:  false,
    blending:    THREE.AdditiveBlending,
  })

  return mat as THREE.ShaderMaterial & { uniforms: GlowUniforms }
}
