/**
 * Game scene & camera.
 */

class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.fov = 60;
    this.camera = new THREE.PerspectiveCamera(this.fov, 1.0, 0.1, 1000.0);

    // temp
    const box = new THREE.Mesh(
      new THREE.BoxBufferGeometry(2, 3, 4),
      new THREE.MeshBasicMaterial({color: 0xff0000})
    );
    this.box = box;
    this.scene.add(box);
    this.camera.position.x = 10;
    this.camera.position.y = 10;
    this.camera.position.z = 10;
    this.camera.lookAt(box.position);
  }

  update(delta) {
    this.box.rotation.y += Math.PI / 8 * delta;
  }

  resize(w, h) {
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }
}

export { Scene };
