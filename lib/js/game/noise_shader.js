const NoiseShader = {
  vertexShader: `
    varying vec2 vuv;

    void main() {
      vuv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float t;
    varying vec2 vuv;

    float rand(vec2 seed) {
      return fract(sin(dot(seed.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    void main() {
      vec2 v = vec2(vuv + mod(t, 1.0));
      float r = rand(v) * 0.1;
      vec4 frag = vec4(r, r, r, 1.0);
      gl_FragColor = frag;
    }
  `
};

export { NoiseShader };
