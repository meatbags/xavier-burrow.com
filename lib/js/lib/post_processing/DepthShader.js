/**
  @author meatbags / https://github.com/meatbags
  **/

THREE.DepthShader = {
  uniforms: {},
  vertexShader: `
    varying vec4 vModel;
    varying vec3 vNormal;

    void main() {
      vNormal = normal;
      vModel = modelMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec4 vModel;
    varying vec3 vNormal;

    void main() {
      float y = (vModel.y >= 0.0) ? (vModel.y) / 6.0 : 0.0;

      gl_FragColor = vec4(y * 1.2, y, y, vModel.w);
    }
  `
};
