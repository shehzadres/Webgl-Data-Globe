#include ../common/utils.glsl

uniform float uTime;
uniform float uSpeed;
uniform float uScale;
uniform float uIntensity;
uniform vec3  uColor;

varying vec2 vUv;
varying vec3 vWorldPos;

void main() {
  vec2 p = vUv * uScale;

  // Layer two animated FBM samples for turbulence
  float t  = uTime * uSpeed;
  float n1 = fbm(p + vec2(t * 0.3, t * 0.15), 4);
  float n2 = fbm(p + vec2(-t * 0.2, t * 0.25) + n1, 3);
  float n  = mix(n1, n2, 0.5);

  float alpha = saturate(n * uIntensity);
  gl_FragColor = vec4(uColor * n, alpha);
}
