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
      this.boxes.push(new Box($(e), this.camera));
    });

    this.active = true;
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
