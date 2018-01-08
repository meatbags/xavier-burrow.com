import Renderer from './renderer';
import Camera from './camera';
import Scene from './scene';

class Master {
  constructor(isMobile) {
    // check for mobile

    this.isMobile = isMobile;

    // set up

    this.scene = new Scene();
    this.camera = new Camera(960, 540);
    this.renderer = new Renderer(this.scene.getScene(), this.camera.getCamera());

    // DOM

    $('body').append(this.renderer.getDOMElement());
  }

  run() {
    // run loop

    this.time = (new Date()).getTime();
    this.paused = false;
    this.frameInterval = 1 / 30;
    this.loop();
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

    this.scene.update(delta);
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
