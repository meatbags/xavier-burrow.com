import Renderer from './renderer';
import Camera from './camera';
import Scene from './scene';
import BoxHandler from './box_handler';

class Master {
  constructor(isMobile) {
    this.isMobile = isMobile;
    this.scene = new Scene();
    this.camera = new Camera(960, 540);
    this.renderer = new Renderer(this.scene.getScene(), this.camera.getCamera());
    this.resize();

    // add to doc
    document.body.appendChild(this.renderer.renderer.domElement);
  }

  run() {
    this.render(0);
    this.mouse = new THREE.Vector3(-100, 0, -100);
    this.boxHandler = new BoxHandler(this.camera);

    // timing
    this.time = (new Date()).getTime();
    this.paused = false;
    this.fps = 24;
    this.frameInterval = 1 / this.fps;
    this.loop();
  }

  reset() {
    if (this.boxHandler) {
      this.boxHandler.reset();
    }
  }

  resize() {
    // resize app
    // TODO - mobile sizing & orientation
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

  blur() {
    // pause app
    this.paused = true;
  }

  focus() {
    // resume app
    this.time = (new Date()).getTime();
    this.paused = false;
    this.loop();
  }

  update(delta) {
    // update logic
    if (this.boxHandler.isActive()) {
      this.scene.collision(this.boxHandler.getBoxes());
      this.boxHandler.deactivate();
    }

    this.scene.update(delta, this.mouse);
  }

  render(delta) {
    this.camera.update(delta);
    this.renderer.render(delta);
  }

  loop() {
    // main app loop
    if (!this.paused) {
      requestAnimationFrame(() => { this.loop(); });
      const now = (new Date()).getTime();
      const delta = (now - this.time) / 1000;

      if (delta >= this.frameInterval) {
        this.time = now;
        this.update(delta);
  		  this.render(delta);
      }
    }
  }
}

export { Master };
