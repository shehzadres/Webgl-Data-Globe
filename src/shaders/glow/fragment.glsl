#include ../common/utils.glsl

uniform vec3  uGlowColor;
uniform float uGlowIntensity;
uniform float uGlowFalloff;

varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
  vec3  N = normalize(vNormal);
  vec3  V = normalize(vViewDir);
  float cosTheta = saturate(dot(V, N));
  float glow     = pow(1.0 - cosTheta, uGlowFalloff) * uGlowIntensity;
  gl_FragColor   = vec4(uGlowColor * glow, glow);
}
