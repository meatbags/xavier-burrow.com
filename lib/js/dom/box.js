/**
 * World-space bounding-box corresponding to a screen-space dom element.
 */

import { dot2D, subVector } from '../maths';

class Box {
  constructor(elem, camera) {
    this.elem = elem;
    this.camera = camera;

    // corners
    this.position = new THREE.Vector3();
    this.a = new THREE.Vector3();
    this.b = new THREE.Vector3();
    this.c = new THREE.Vector3();
    this.d = new THREE.Vector3();
    this.setPoints();
  }

  update() {
    this.setPoints();
  }

  setPoints() {
    // set position in world space
    const box = this.elem.getBoundingClientRect();
    const L = box.left;
    const T = box.top;
    const W = box.width;
    const H = box.height;
    const X = L + W / 2;
    const Y = T + H / 2;

    // convert
    this.camera.toWorldSpace(X, Y, this.position);
    this.camera.toWorldSpace(L, Y, this.a);
    this.camera.toWorldSpace(L + W, Y, this.b);
    this.camera.toWorldSpace(X, T, this.c);
    this.camera.toWorldSpace(X, T + H, this.d);

    // set normals
    this.normal = {};
    this.normal.a = this.a.clone().sub(this.position);
    this.normal.b = this.b.clone().sub(this.position);
    this.normal.c = this.c.clone().sub(this.position);
    this.normal.d = this.d.clone().sub(this.position);
  }

  collision(point) {
    return (
      dot2D(subVector(this.a, point), this.normal.a) >= 0 &&
      dot2D(subVector(this.b, point), this.normal.b) >= 0 &&
      dot2D(subVector(this.c, point), this.normal.c) >= 0 &&
      dot2D(subVector(this.d, point), this.normal.d) >= 0
    );
  }
}

export { Box };
