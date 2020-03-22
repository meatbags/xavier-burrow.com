/** Renderer */

import Config from './config';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';

class Renderer {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({antialias: false, alpha: true});
    this.renderer.outputEncoding = THREE.GammaEncoding;
    this.renderer.setClearColor(0x0, 0);
    this.renderer.gammaFactor = 2.0;
    document.querySelector('#canvas-target').appendChild(this.renderer.domElement);
  }

  bind(root) {
    this.ref = {};
    this.ref.scene = root.modules.scene.scene;
    this.ref.camera = root.modules.camera.camera;

    // clipping planes
    this.setClippingPlanes();

    // effect composer
    this.composer = new EffectComposer(this.renderer);
		this.composer.addPass(new RenderPass(this.ref.scene, this.ref.camera));
		this.afterimagePass = new AfterimagePass();
    this.afterimagePass.uniforms.damp.value = 0.98125;
		this.composer.addPass(this.afterimagePass);

    // enable
    this.composerEnabled = false;
  }

  setClippingPlanes() {
    /*
    const d = Config.boxSize + 0.5;
    this.renderer.clippingPlanes = [
      new THREE.Plane(new THREE.Vector3(1, 0, 0), d),
      new THREE.Plane(new THREE.Vector3(-1, 0, 0), d),
      new THREE.Plane(new THREE.Vector3(0, 1, 0), d),
      new THREE.Plane(new THREE.Vector3(0, -1, 0), d),
      new THREE.Plane(new THREE.Vector3(0, 0, 1), d),
      new THREE.Plane(new THREE.Vector3(0, 0, -1), d)
    ];
    */
  }

  resize() {
    this.size = {x: window.innerWidth, y: window.innerHeight};
    this.renderer.setSize(this.size.x, this.size.y);
    this.composer.setSize(this.size.x, this.size.y);
  }

  render(delta) {
    if (this.composerEnabled) {
      this.composer.render(this.ref.scene, this.ref.camera);
    } else {
      this.renderer.render(this.ref.scene, this.ref.camera);
    }
  }
}

export default Renderer;
