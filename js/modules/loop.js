/** the main loop */

import * as THREE from 'three';

class Loop {
  constructor() {
    this.active = false;
    this.deltaMax = 0.1;
  }

  bind(root) {
    this.ref = {};
    this.ref.update = [];
    this.ref.render = [];

    // modules for update & render
    Object.keys(root.modules).forEach(key => {
      if (root.modules[key].update) {
        this.ref.update.push(root.modules[key]);
      }
      if (root.modules[key].render) {
        this.ref.render.push(root.modules[key]);
      }
    });

    // doc targets
    this.el = {};
    this.el.wrapper = document.querySelector('.wrapper');
    this.el.canvasWrapper = document.querySelector('.canvas-wrapper');
    this.now = performance.now();

    // go!
    this.loop();
  }

  start() {
    if (!this.active) {
      this.el.canvasWrapper.classList.remove('paused');
      this.now = performance.now();
      this.active = true;
    }
  }

  stop() {
    if (this.active) {
      this.active = false;
      this.el.canvasWrapper.classList.add('paused');
    }
  }

  loop() {
    requestAnimationFrame(() => { this.loop(); });

    if (this.active) {
      const now = performance.now();
      const delta = Math.min(this.deltaMax, (now - this.now) / 1000);
      this.now = now;
      this.ref.update.forEach(mod => { mod.update(delta); });
      this.ref.render.forEach(mod => { mod.render(delta); });
    }
  }
}

export default Loop;
