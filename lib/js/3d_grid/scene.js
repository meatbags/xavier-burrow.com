/**
 * Scene containing grid and cells. Handles animation.
 */

import { Cell } from './cell';

class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.createGrid();
    this.plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(100, 100), new THREE.MeshBasicMaterial({color: 0xffffff}));
    this.plane.rotation.x = Math.PI * 1.5;
    this.plane.position.y = 0;
    this.scene.add(this.plane);

    // lighting
    const light = new THREE.PointLight(0xffffff, 1, 100, 2);
    light.position.set(0, 2, 0);
    this.scene.add(light);
  }

  createGrid() {
    const n = 24;
    const rot = Math.PI * 0.25;
    const step = 1.1;
    const nodeRadius = 0.4;
    const cutoff = 19;
    const origin = new THREE.Vector3();

    // add cells
    this.grid = [];
    for (var x=-n; x<n; ++x) {
      for (var z=-n; z<n; ++z) {
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
    for (var i=0, len=this.grid.length; i<len; ++i) {
      this.grid[i].collision(boxes);
    }
  }

  update(delta, mouse) {
    for (var i=0, len=this.grid.length; i<len; i++) {
      this.grid[i].update(delta, mouse);
    }
  }

  getScene() {
    return this.scene;
  }
}

export { Scene };
