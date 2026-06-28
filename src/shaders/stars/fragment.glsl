uniform vec3  uColor;
uniform float uOpacity;

varying float vAlpha;

void main() {
  // Signed distance from center of point sprite
  vec2  coord  = gl_PointCoord - 0.5;
  float dist   = length(coord);

  // Soft disc — discard corners of the point sprite square
  if (dist > 0.5) discard;

  // Soft falloff toward edge
  float softness = 1.0 - smoothstep(0.2, 0.5, dist);

  gl_FragColor = vec4(uColor, softness * vAlpha * uOpacity);
}
