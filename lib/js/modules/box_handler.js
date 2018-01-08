import { Box, Circle } from './dom';

class BoxHandler {
  constructor(camera) {
    // screenspace blocking

    this.camera = camera;

    // DOM

    this.selector = {
      box: '.box',
      circle: '.circle'
    };

    // get initial state

    this.create();
  }

  update() {
    // update state

    for (let i=0; i<this.boxes.length; i++) {
      this.boxes[i].update();
    }
  }

  create() {
    // create list

    this.boxes = [];
    $(this.selector.box).each((i, e) => {
      this.boxes.push(new Box($(e), this.camera));
    });
  }

  getBoxes() {
    // get boxes

    return this.boxes;
  }
}

export default BoxHandler;
