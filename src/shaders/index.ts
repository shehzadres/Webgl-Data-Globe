// Manager
export { ShaderManager } from './ShaderManager'

// Uniform registry
export { shaderUniforms } from './uniforms/shaderUniforms'
export type { TimedMaterial, ResolutionMaterial } from './uniforms/shaderUniforms'

// Material factories
export { createAtmosphereMaterial } from './materials/atmosphereMaterial'
export type { AtmosphereUniforms }  from './materials/atmosphereMaterial'

export { createGlowMaterial }       from './materials/glowMaterial'
export type { GlowUniforms, GlowMaterialOptions } from './materials/glowMaterial'

export { createNoiseMaterial }      from './materials/noiseMaterial'
export type { NoiseUniforms, NoiseMaterialOptions } from './materials/noiseMaterial'

export { createStarMaterial }       from './materials/starMaterial'
export type { StarUniforms, StarMaterialOptions } from './materials/starMaterial'
