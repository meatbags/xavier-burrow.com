/** App */

import Camera from './modules/camera';
import Loop from './modules/loop';
import Renderer from './modules/renderer';
import Scene from './modules/scene';

class App {
  constructor() {
    this.modules = {
      camera: new Camera(),
      loop: new Loop(),
      renderer: new Renderer(),
      scene: new Scene(),
    };

    // bind modules
    for (const key in this.modules) {
      if (typeof this.modules[key].bind === 'function') {
        this.modules[key].bind(this);
      }
    }

    // resize
    this.resize();
    window.addEventListener('resize', () => { this.resize(); });
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.resize();
      }, 200);
    });
    
    // start
    this.modules.loop.start();
  }

  resize() {
    for (const key in this.modules) {
      if (typeof this.modules[key].resize === 'function') {
        this.modules[key].resize();
      }
    }
  }
}

window.addEventListener('load', () => {
  const app = new App();
});
