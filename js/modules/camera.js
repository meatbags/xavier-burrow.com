/** Camera */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class Camera {
  constructor(root) {
    this.offset = 0.1;
    this.camera = new THREE.PerspectiveCamera(65, 1, 0.1, 2000000);
    this.camera.up = new THREE.Vector3(0, 1, 0);
    this.camera.rotation.order = 'YXZ';
  }

  bind(root) {
    this.ref = {};
    this.ref.renderer = root.modules.renderer;
    // controls
    this.camera.position.set(-0.6, 0.25, -1);
    this.camera.position.multiplyScalar(140);
    this.controls = new OrbitControls(this.camera, this.ref.renderer.renderer.domElement);
    this.controls.enableDamping = true;
		this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2;
		this.controls.screenSpacePanning = false;
    this.controls.minDistance = 100;
		this.controls.maxDistance = 500;
    this.controls.update();
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
    this.controls.update();
  }
}

export default Camera;
