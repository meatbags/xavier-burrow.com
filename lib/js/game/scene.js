/**
 * Game scene & camera.
 */

class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.fov = 45;
    this.camera = new THREE.PerspectiveCamera(this.fov, 1.0, 0.1, 1000.0);
    this.plane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(20, 20, 10, 10),
      new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true})
    );
    this.plane.rotation.x = Math.PI / 2;
    this.scene.add(this.plane);

    this.camera.position.x = 10;
    this.camera.position.y = 10;
    this.camera.position.z = 10;
    this.camera.lookAt(this.plane.position);
  }

  update(delta) {
    this.plane.rotation.z += Math.PI / 16 * delta;
  }

  resize(w, h) {
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }
}

export { Scene };
