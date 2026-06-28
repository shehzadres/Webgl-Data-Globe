module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react-refresh', '@typescript-eslint', 'react', 'react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/prop-types': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    // R3F uses custom JSX elements that extend HTML/SVG; disable property checks
    'react/no-unknown-property': ['error', { ignore: [
      'args', 'attach', 'castShadow', 'receiveShadow', 'position', 'rotation',
      'quaternion', 'scale', 'intensity', 'color', 'roughness', 'metalness',
      'wireframe', 'map', 'normalMap', 'envMapIntensity', 'transparent', 'opacity',
      'shadow-mapSize', 'shadow-camera-near', 'shadow-camera-far', 'shadow-bias',
      'object', 'geometry', 'material', 'dispose', 'frustumCulled', 'renderOrder',
      'emissive', 'emissiveIntensity', 'depthOffset', 'anchorX', 'anchorY',
      'outlineWidth', 'outlineColor', 'alphaMap', 'blending', 'depthWrite',
      'side', 'shininess', 'specular', 'specularMap', 'normalScale',
    ] }],
  },
}
