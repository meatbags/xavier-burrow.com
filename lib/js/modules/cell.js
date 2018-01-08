class Cell {
  constructor(x, z) {
    // interactive cell

    this.group = new THREE.Group();
    this.x = x;
    this.y = Math.random() * 0.45;
    this.z = z;

    // add components to group

    this.radius = 0.75 + Math.random() * 0.5;
    const mat = new THREE.ShaderMaterial(THREE.DepthShader);
    const cylinder = new THREE.Mesh(new THREE.CylinderBufferGeometry(this.radius, this.radius, 6, 16), mat);
    const cap = new THREE.Mesh(new THREE.SphereBufferGeometry(this.radius, 16, 16), mat);
    cap.position.set(0, 3, 0);
    this.group.add(cap, cylinder);
    this.group.position.set(this.x, this.y, this.z);

    // logic set up

    this.age = 0;
  }

  update(delta) {
    // update cell

    this.age += delta;
    this.group.position.y += Math.sin(this.age + (this.z + this.x * 2) / 10) * 0.01;
  }

  getMesh() {
    // get mesh reference

    return this.group;
  }
}

export default Cell;
