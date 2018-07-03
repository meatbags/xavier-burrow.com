/**
 * Handle scene logic and rendering.
 */

import { Renderer } from './renderer';
import { Camera } from './camera';
import { Scene } from './scene';
import { BoxHandler } from './box_handler';

class Grid3D {
  constructor() {
    this.isMobile = window.mobileCheck();
    this.scene = new Scene();
    this.camera = new Camera(960, 540);
    this.renderer = new Renderer(this.scene.getScene(), this.camera.getCamera());
    this.resize();

    // add to doc
    document.body.appendChild(this.renderer.renderer.domElement);

    // logic
    this.mouse = new THREE.Vector3(-100, 0, -100);
    this.boxHandler = new BoxHandler(this.camera);

    // timing
    this.age = 0;
    this.paused = false;
    this.fps = 24;
    this.frameInterval = 1 / this.fps;
  }

  reset() {
    if (this.boxHandler) {
      this.boxHandler.reset();
    }
  }

  resize() {
    // resize app
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer.resize(width, height);
    this.camera.resize(width, height);

    // set state
    if (this.boxHandler) {
      this.boxHandler.update();
    }
  }

  handleMouse(x, y) {
    this.camera.toWorldSpace(x, y, this.mouse);
  }

  update(delta) {
    this.age += delta;

    if (this.age >= this.frameInterval) {
      // update logic
      if (this.boxHandler.isActive()) {
        this.scene.collision(this.boxHandler.getBoxes());
        this.boxHandler.deactivate();
      }

      this.scene.update(this.age, this.mouse);

      // render
      this.camera.update(this.age);
      this.renderer.render(this.age);

      // reset
      this.age -= this.frameInterval;
    }
  }
}

export { Grid3D };
