import Renderer from './renderer';
import Camera from './camera';
import Scene from './scene';
import BoxHandler from './box_handler';

class Master {
  constructor(isMobile) {
    // check for mobile

    this.isMobile = isMobile;

    // set up

    this.scene = new Scene();
    this.camera = new Camera(960, 540);
    this.renderer = new Renderer(this.scene.getScene(), this.camera.getCamera());

    // initial sizing

    this.resize();

    // DOM

    $('body').append(this.renderer.getDOMElement());
  }

  run() {
    // set up and run

    this.render(0);
    this.mouse = new THREE.Vector3(-100, 0, -100);
    this.boxHandler = new BoxHandler(this.camera);

    // timing

    this.time = (new Date()).getTime();
    this.paused = false;
    this.frameInterval = 1 / 30;
    this.loop();
  }

  reset() {
    // set boxes

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
    // handle mouse position

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
      // handle box change

      this.scene.collision(this.boxHandler.getBoxes());
      this.boxHandler.deactivate();
    }

    this.scene.update(delta, this.mouse);
  }

  render(delta) {
    // render scene

    this.camera.update(delta);
    this.renderer.render(delta);
  }

  loop() {
    // main app loop

    if (!this.paused) {
      requestAnimationFrame(() => { this.loop(); });

      // timing

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

export default Master;
