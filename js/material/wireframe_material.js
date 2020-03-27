/** Wireframe shader */

import * as THREE from 'three';

const vertexShader = `
  attribute vec3 center;
  varying vec3 vCenter;
  varying vec2 vUV;

  void main() {
    vUV = uv;
    vCenter = center;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }`;

const fragmentShader = `
  #define widthFactor 1.0
  #define uvEdgeMin 0.015
  #define uvEdgeMax 0.985
  varying vec3 vCenter;
  varying vec2 vUV;

  bool edgeFactorUV() {
    return vUV.x <= uvEdgeMin || vUV.y <= uvEdgeMin ||
      vUV.x >= uvEdgeMax || vUV.y >= uvEdgeMax;
  }

  bool edgeFactorTri() {
    vec3 d = fwidth(vCenter.xyz);
    vec3 a3 = smoothstep(vec3(0.0), d * widthFactor, vCenter.xyz);
    return min(min(a3.x, a3.y), a3.z) <= 0.99;
  }

  void main() {
    bool res = edgeFactorUV();// && edgeFactorTri();
    gl_FragColor = res ? vec4(1.0, 1.0, 1.0, 1.0) : vec4(0.0, 0.0, 0.0, 0.0);
  }`;

const WireframeMaterial = new THREE.ShaderMaterial({
  uniforms: {},
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
});

WireframeMaterial.extensions.derivatives = true;
WireframeMaterial.side = THREE.DoubleSide;

export default WireframeMaterial;
