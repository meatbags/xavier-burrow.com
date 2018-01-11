import { Box, Circle } from './dom';

class BoxHandler {
  constructor(camera) {
    // screenspace blocking

    this.camera = camera;

    // DOM

    this.selector = {
      box: '.box.active'
    };

    // get initial state

    this.reset();
  }

  reset() {
    // create list

    this.boxes = [];
    $(this.selector.box).each((i, e) => {
      if (this.onScreen($(e))) {
        this.boxes.push(new Box($(e), this.camera));
      }
    });

    this.active = true;
  }

  onScreen(e) {
    // check is element is onscreen

    const L = e.offset().left;
    const R = L + e.width();
    const T = e.offset().top;
    const B = T + e.height();

    return ((L < window.innerWidth || R > 0) && (T < window.innerHeight && B > 0));
  }

  update() {
    // update state

    for (let i=0; i<this.boxes.length; i++) {
      this.boxes[i].update();
    }

    this.active = true;
  }

  deactivate() {
    this.active = false;
  }

  isActive() {
    // check state

    return this.active;
  }

  getBoxes() {
    // get boxes

    return this.boxes;
  }
}

export default BoxHandler;
