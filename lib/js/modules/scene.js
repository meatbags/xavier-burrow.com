import Cell from './cell';

class Scene {
  constructor() {
    // scene handler

    this.scene = new THREE.Scene();

    // create cell grid

    this.createGrid();

    // plane

    this.plane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(100, 100),
      new THREE.MeshBasicMaterial({color: 0x0})
    );
    this.plane.rotation.x = Math.PI * 1.5;
    this.plane.position.y = 0;
    this.scene.add(this.plane);

    // lights

    const light = new THREE.PointLight(0xffffff, 1, 100, 2);
    light.position.set(0, 2, 0);
    this.scene.add(light);
  }

  createGrid() {
    // create reactive cell grid

    this.grid = [];

    // settings

    const n = 24;
    const rot = Math.PI * 0.25;
    const step = 1.1;
    const nodeRadius = 0.4; // + random() * r
    const cutoff = 19;
    const origin = new THREE.Vector3();

    // add cells

    for (let x=-n; x<n; x++) {
      for (let z=-n; z<n; z++) {
        const coords = new THREE.Vector2(x * step, z * step);

        if (coords.distanceTo(origin) < cutoff) {
          const cell = new Cell(coords.x, coords.y, nodeRadius);
          this.grid.push(cell);
          this.scene.add(cell.getMesh());
        }
      }
    }
  }

  collision(boxes) {
    // apply collisions to scene

    for (let i=0; i<this.grid.length; i++) {
      this.grid[i].collision(boxes);
    }
  }

  update(delta, mouse) {
    // update scene

    for (let i=0; i<this.grid.length; i++) {
      this.grid[i].update(delta, mouse);
    }
  }

  getScene() {
    // get scene reference

    return this.scene;
  }
}

export default Scene;
