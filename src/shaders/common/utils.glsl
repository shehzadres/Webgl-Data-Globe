// ── Math ─────────────────────────────────────────────────────────────────────
#define PI     3.14159265358979
#define TAU    6.28318530717959
#define INV_PI 0.31830988618379

float saturate(float v) { return clamp(v, 0.0, 1.0); }
float remap(float v, float i0, float i1, float o0, float o1) {
  return o0 + (o1 - o0) * ((v - i0) / (i1 - i0));
}

// ── Pseudo-random ─────────────────────────────────────────────────────────────
float rand(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

// ── Value noise (2D) ─────────────────────────────────────────────────────────
float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f); // smooth-step
  float a = rand(i);
  float b = rand(i + vec2(1.0, 0.0));
  float c = rand(i + vec2(0.0, 1.0));
  float d = rand(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// ── Fractional Brownian Motion ────────────────────────────────────────────────
float fbm(vec2 p, int octaves) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 6; i++) {
    if (i >= octaves) break;
    value += amplitude * valueNoise(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return value;
}

// ── 2D Rotation ───────────────────────────────────────────────────────────────
vec2 rotate2D(vec2 v, float angle) {
  float s = sin(angle), c = cos(angle);
  return mat2(c, -s, s, c) * v;
}

// ── Fresnel ───────────────────────────────────────────────────────────────────
float fresnelSchlick(float cosTheta, float F0) {
  return F0 + (1.0 - F0) * pow(saturate(1.0 - cosTheta), 5.0);
}

// ── Color utilities ───────────────────────────────────────────────────────────
vec3 srgbToLinear(vec3 c) { return pow(c, vec3(2.2)); }
vec3 linearToSrgb(vec3 c) { return pow(c, vec3(1.0 / 2.2)); }
