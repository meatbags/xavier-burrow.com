/** Camera */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Config from './config';
import Controls from '../ui/controls';

class Camera {
  constructor(root) {
    this.offset = 0.1;
    this.camera = new THREE.PerspectiveCamera(65, 1, 0.1, 2000000);
    this.camera.up = new THREE.Vector3(0, 1, 0);
    this.camera.rotation.order = 'YXZ';
    this.camera.fov = 65;
    this.camera.updateProjectionMatrix();
    this.origin = new THREE.Vector3();
    this.angle = 0;
    this.distance = 200;
    this.rotation = Math.PI / 100;
  }

  bind(root) {
    this.ref = {};
    this.ref.renderer = root.modules.renderer;
    this.camera.position.set(-5, 0, -5);
    this.camera.lookAt(this.origin);
    this.controls = new Controls({
      camera: this.camera,
      domTarget: this.ref.renderer.renderer.domElement,
    });
  }

  addAudioListener() {
    this.listener = new THREE.AudioListener();
    this.camera.add(this.listener);
  }

  resize() {
    this.size = {x: window.innerWidth, y: window.innerHeight};
    this.camera.aspect = this.size.x / this.size.y;
    this.camera.updateProjectionMatrix();
  }

  update(delta) {
    this.controls.update(delta);
  }
}

export default Camera;
