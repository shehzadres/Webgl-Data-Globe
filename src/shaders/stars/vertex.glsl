attribute float size;
attribute float alpha;

uniform float uTime;
uniform float uPixelRatio;
uniform float uBaseSize;

varying float vAlpha;

void main() {
  vAlpha = alpha;

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position  = projectionMatrix * mvPosition;

  // Size in pixels — use uBaseSize multiplied by per-vertex size attribute
  gl_PointSize = uBaseSize * size * uPixelRatio * (300.0 / -mvPosition.z);
  gl_PointSize = clamp(gl_PointSize, 0.5, 6.0);
}
