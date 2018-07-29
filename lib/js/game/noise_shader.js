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
    uniform float alpha;
    varying vec2 vuv;
    #define EDGE 0.01
    #define POSTER 20.0

    float rand(vec2 seed) {
      return fract(sin(dot(seed.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    vec2 posterise(vec2 v) {
      return vec2(floor(v.x * POSTER) / POSTER, floor(v.y * POSTER) / POSTER);
    }

    bool valid(vec2 p, vec2 v) {
      float x = v.x - p.x;
      float y = v.y - p.y;
      return (x < EDGE || y < EDGE || x > 1. - EDGE || y > 1. - EDGE);
    }

    void main() {
      float r, a;
      vec2 post = posterise(vuv);
      if (valid(post, vuv)) {
        float f = mod(t, 1.0);
        vec2 v = vec2(post + f);
        r = rand(v) * 0.25;
        a = alpha;
      } else {
        r = 0.0;
        a = 0.0;
      }
      gl_FragColor = vec4(r, r, r, a);
    }
  `
};

export { NoiseShader };
