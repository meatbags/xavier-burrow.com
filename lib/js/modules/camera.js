class Camera {
  constructor(width, height) {
    // orthographic camera

    this.size = 6;
    this.width = this.size * (width / height);
    this.height = this.size;
    this.near = 1;
    this.far = 1000;
    this.camera = new THREE.OrthographicCamera(-this.width, this.width, this.height, -this.height, this.near, this.far);
    this.camera.updateProjectionMatrix();
    this.domOffset = 100;

    // set up

    this.distance = 20;
    this.age = Math.PI * 0.25;
    this.position = new THREE.Vector3(Math.sin(this.age) * this.distance, this.distance, Math.cos(this.age) * this.distance);
    this.camera.position.set(this.position.x, this.position.y, this.position.z);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    // raycasting

    this.intersectPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0));
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
  }

  update(delta) {
    // update camera

    //this.age += delta * 0.1;
    //this.position = new THREE.Vector3(Math.sin(this.age) * this.distance, this.distance * 2, Math.cos(this.age) * this.distance);
    //this.camera.position.set(this.position.x, this.position.y, this.position.z);
    //this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  resize(width, height) {
    // resize camera

    this.width = this.size * (width / height);
    this.camera.left = -this.width;
    this.camera.right = this.width;
    this.camera.updateProjectionMatrix();
  }

  toWorldSpace(x, y, target) {
    // convert screen space coordinates to world space

    this.mouse.x = (x / window.innerWidth) * 2 - 1;
    this.mouse.y = -((y + this.domOffset) / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // store in target

    this.raycaster.ray.intersectPlane(this.intersectPlane, target);
  }

  getCamera() {
    // get camera reference

    return this.camera;
  }
}

export default Camera;
