import Cell from './cell';

class Scene {
  constructor() {
    // scene handler

    this.scene = new THREE.Scene();

    // create cell grid

    this.grid = [];
    for (let x=-32; x<32; x+=2) {
      for (let y=-32; y<32; y+=2) {
        const cell = new Cell(x, y);
        this.grid.push(cell);
        this.scene.add(cell.getMesh());
      }
    }

    // lights

    const light = new THREE.PointLight(0xffffff, 1, 30, 2);
    light.position.set(0, 2, 0);
    this.scene.add(light, new THREE.AmbientLight(0xffffff, 0.2));
  }

  collision(boxes) {
    // apply collisions to scene

    for (let i=0; i<this.grid.length; i++) {
      this.grid[i].collision(boxes);
    }
  }

  update(delta) {
    // update scene

    for (let i=0; i<this.grid.length; i++) {
      this.grid[i].update(delta);
    }
  }

  getScene() {
    // get scene reference

    return this.scene;
  }
}

export default Scene;
