varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vWorldPos;

void main() {
  vec4 worldPos   = modelMatrix * vec4(position, 1.0);
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

  vWorldPos = worldPos.xyz;
  vNormal   = normalize(normalMatrix * normal);
  vViewDir  = normalize(-mvPosition.xyz);

  gl_Position = projectionMatrix * mvPosition;
}
