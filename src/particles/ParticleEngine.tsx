import { memo } from 'react'
import { StarField } from './systems/StarField'
import { OrbitalParticles } from './systems/OrbitalParticles'
import { AmbientDust } from './systems/AmbientDust'
import { useParticleStore } from './particleStore'

/**
 * ParticleEngine mounts all particle systems into the R3F scene.
 * Each system reads its config from particleStore — no props drilling.
 * Add new systems here as they are implemented in future milestones.
 */
export const ParticleEngine = memo(() => {
  const { stars, orbits, dust } = useParticleStore()

  return (
    <group name="particle-engine">
      <StarField config={stars} />
      <OrbitalParticles config={orbits} />
      <AmbientDust config={dust} />
    </group>
  )
})

ParticleEngine.displayName = 'ParticleEngine'
