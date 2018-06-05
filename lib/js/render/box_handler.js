/**
 * Generic bounding box functions.
 */

import { Box, Circle } from '../dom';

class BoxHandler {
  constructor(camera) {
    this.camera = camera;
    this.reset();
  }

  reset() {
    // create list
    this.boxes = [];
    document.querySelectorAll('.box.active').forEach(e => {
      if (this.onScreen(e)) {
        this.boxes.push(new Box(e, this.camera));
      }
    });
    this.active = true;
  }

  onScreen(e) {
    // check is element is onscreen
    const rect = e.getBoundingClientRect();
    const L = rect.left;
    const R = L + rect.width;
    const T = rect.top;
    const B = T + rect.height;
    return ((L < window.innerWidth || R > 0) && (T < window.innerHeight && B > 0));
  }

  update() {
    for (let i=0; i<this.boxes.length; i++) {
      this.boxes[i].update();
    }
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }

  isActive() {
    return this.active;
  }

  getBoxes() {
    return this.boxes;
  }
}

export { BoxHandler };
