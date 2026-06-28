import * as THREE from 'three'
import vertexShader   from '@/shaders/atmosphere/vertex.glsl'
import fragmentShader from '@/shaders/atmosphere/fragment.glsl'
import { LIGHTING_CONFIG } from '@/systems/rendererConfig'

export interface AtmosphereUniforms extends Record<string, THREE.IUniform<unknown>> {
  uSunDirection: THREE.IUniform<THREE.Vector3>
  uAtmoColor:    THREE.IUniform<THREE.Color>
  uIntensity:    THREE.IUniform<number>
  uFalloff:      THREE.IUniform<number>
  uSunInfluence: THREE.IUniform<number>
}

export function createAtmosphereMaterial(): THREE.ShaderMaterial & { uniforms: AtmosphereUniforms } {
  const sunDir = new THREE.Vector3(...LIGHTING_CONFIG.directional.position).normalize()

  const uniforms: AtmosphereUniforms = {
    uSunDirection: { value: sunDir },
    uAtmoColor:    { value: new THREE.Color(0.25, 0.55, 1.0) },
    uIntensity:    { value: 0.85 },
    uFalloff:      { value: 3.5 },
    uSunInfluence: { value: 0.35 },
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

  return mat as THREE.ShaderMaterial & { uniforms: AtmosphereUniforms }
}
