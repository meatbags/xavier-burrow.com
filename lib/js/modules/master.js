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

    // initial sizing

    this.resize();

    // logic set up

    this.ball = new THREE.Mesh(new THREE.SphereBufferGeometry(5, 32, 32), new THREE.MeshPhongMaterial());
    this.scene.scene.add(this.ball);
    this.mouse = new THREE.Vector3();

    // DOM

    $('body').append(this.renderer.getDOMElement());
  }

  resize() {
    // resize app
    // TODO - mobile sizing & orientation

    const width = window.innerWidth;
    const height = window.innerHeight;

    this.renderer.resize(width, height);
    this.camera.resize(width, height);
  }

  run() {
    // run loop

    this.time = (new Date()).getTime();
    this.paused = false;
    this.frameInterval = 1 / 24;
    this.loop();
  }

  handleMouse(x, y) {
    // handle mouse position

    this.camera.toWorldSpace(x, y, this.mouse);
    this.ball.position.set(this.mouse.x, this.mouse.y, this.mouse.z);
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
