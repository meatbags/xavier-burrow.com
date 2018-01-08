class Camera {
  constructor(width, height) {
    // orthographic camera

    this.size = 10;
    this.width = this.size * (width / height);
    this.height = this.size;
    this.near = 1;
    this.far = 1000;
    this.camera = new THREE.OrthographicCamera(-this.width, this.width, this.height, -this.height, this.near, this.far);
    this.camera.updateProjectionMatrix();

    // set up

    this.distance = 20;
    this.age = 0;
    this.position = new THREE.Vector3(Math.sin(this.age) * this.distance, this.distance, Math.cos(this.age) * this.distance);
    this.camera.position.set(this.position.x, this.position.y, this.position.z);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  update(delta) {
    // update camera

    this.age += delta * 0.1;
    this.position = new THREE.Vector3(Math.sin(this.age) * this.distance, this.distance * 2, Math.cos(this.age) * this.distance);
    this.camera.position.set(this.position.x, this.position.y, this.position.z);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  resize(width, height) {
    // resize camera
  }

  toWorldSpace(x, y) {
    // convert screen space coordinates to world space


  }

  getCamera() {
    // get camera reference

    return this.camera;
  }
}

export default Camera;
