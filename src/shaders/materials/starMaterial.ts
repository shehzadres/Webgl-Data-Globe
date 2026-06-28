import * as THREE from 'three'
import vertexShader   from '@/shaders/stars/vertex.glsl'
import fragmentShader from '@/shaders/stars/fragment.glsl'

export interface StarUniforms extends Record<string, THREE.IUniform<unknown>> {
  uTime:       THREE.IUniform<number>
  uPixelRatio: THREE.IUniform<number>
  uBaseSize:   THREE.IUniform<number>
  uColor:      THREE.IUniform<THREE.Color>
  uOpacity:    THREE.IUniform<number>
}

export interface StarMaterialOptions {
  color?:      string | number
  opacity?:    number
  baseSize?:   number
  pixelRatio?: number
}

export function createStarMaterial(
  opts: StarMaterialOptions = {},
): THREE.ShaderMaterial & { uniforms: StarUniforms } {
  const uniforms: StarUniforms = {
    uTime:       { value: 0 },
    uPixelRatio: { value: opts.pixelRatio ?? Math.min(window.devicePixelRatio, 2) },
    uBaseSize:   { value: opts.baseSize   ?? 1.5 },
    uColor:      { value: new THREE.Color(opts.color   ?? 0xffffff) },
    uOpacity:    { value: opts.opacity    ?? 0.9 },
  }

  const mat = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    depthWrite:  false,
    blending:    THREE.AdditiveBlending,
    // Required to use gl_PointSize in vertex shader
  })

  return mat as THREE.ShaderMaterial & { uniforms: StarUniforms }
}
