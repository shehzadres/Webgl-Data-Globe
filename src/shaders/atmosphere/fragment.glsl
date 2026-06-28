#include ../common/utils.glsl

uniform vec3  uSunDirection;
uniform vec3  uAtmoColor;
uniform float uIntensity;
uniform float uFalloff;
uniform float uSunInfluence;

varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vWorldPos;

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vViewDir);
  vec3 S = normalize(uSunDirection);

  // Fresnel — maximum at grazing angle (limb)
  float cosTheta = saturate(dot(V, N));
  float fresnel  = pow(1.0 - cosTheta, uFalloff);

  // Sun-side brightening — atmosphere scatters more on the lit side
  float sunDot  = dot(N, S);
  float sunSide = saturate(sunDot + 0.3);   // shift into dark side slightly
  float sunGlow = pow(sunSide, 1.8) * uSunInfluence;

  // Terminator rim tint — warm orange scatter at day/night boundary
  float terminator = saturate(1.0 - abs(sunDot) * 3.0);
  vec3  tintColor  = mix(uAtmoColor, vec3(0.85, 0.5, 0.2), terminator * 0.35);

  float alpha = saturate((fresnel + sunGlow) * uIntensity);

  gl_FragColor = vec4(tintColor, alpha);
}
