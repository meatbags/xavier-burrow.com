import { isFacing } from '../maths';

class Box {
  constructor(elem, camera) {
    // world-space bounding box from DOM element

    this.elem = elem;
    this.camera = camera;

    // points

    this.position = new THREE.Vector3();
    this.a = new THREE.Vector3();
    this.b = new THREE.Vector3();
    this.c = new THREE.Vector3();
    this.d = new THREE.Vector3();
    this.setPoints();
  }

  update() {
    // update position

    this.setPoints();
  }

  setPoints() {
    // set position in world space

    const L = this.elem.offset().left;
    const T = this.elem.offset().top;
    const W = this.elem.outerWidth();
    const H = this.elem.outerHeight();
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
    // check for collision

    return (
      isFacing(point, this.a, this.normal.a) &&
      isFacing(point, this.b, this.normal.b) &&
      isFacing(point, this.c, this.normal.c) &&
      isFacing(point, this.d, this.normal.d)
    );
  }
}

export default Box;
