/** Camera */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Config from './config';

class Camera {
  constructor(root) {
    this.offset = 0.1;
    this.camera = new THREE.PerspectiveCamera(65, 1, 0.1, 2000000);
    this.camera.up = new THREE.Vector3(0, 1, 0);
    this.camera.rotation.order = 'YXZ';
    this.origin = new THREE.Vector3();
    this.angle = 0;
    this.distance = 200;
    this.rotation = Math.PI / 100;
  }

  bind(root) {
    this.ref = {};
    this.ref.renderer = root.modules.renderer;

    this.setPosition();
    // controls
    /*
    this.camera.position.set(0.25, 0, 0.25);
    this.camera.position.multiplyScalar(Config.cameraDistance);
    this.controls = new OrbitControls(this.camera, this.ref.renderer.renderer.domElement);
    this.controls.enableDamping = true;
		this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2;
		this.controls.screenSpacePanning = false;
    this.controls.minDistance = 100;
		this.controls.maxDistance = 500;
    this.controls.update();
    */
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

  setPosition() {
    const x = Math.cos(this.angle) * this.distance;
    const y = 0;//this.distance / 8;
    const z = Math.sin(this.angle) * this.distance;
    this.camera.position.set(x, y, z);
    this.camera.lookAt(this.origin);
  }

  update(delta) {
    //this.angle += delta * Math.PI * this.rotation;
    //this.controls.update();
  }
}

export default Camera;
