class Cell {
  constructor(x, z) {
    // interactive cell

    this.group = new THREE.Group();
    this.base = new THREE.Vector3(x, 0, z);
    this.position = new THREE.Vector3(x, -1 + Math.random() * 4, z);
    this.target = {
      position: new THREE.Vector3()
    };

    // add components to group

    this.radius = 0.35 + Math.random() * 0.35;
    const mat = new THREE.ShaderMaterial(THREE.DepthShader);
    const cylinder = new THREE.Mesh(new THREE.CylinderBufferGeometry(this.radius, this.radius, 4, 16), mat);
    const cap = new THREE.Mesh(new THREE.SphereBufferGeometry(this.radius, 16, 16), mat);
    cap.position.set(0, 2, 0);
    this.group.add(cap, cylinder);
    this.group.position.set(this.position.x, this.position.y, this.position.z);

    // logic set up

    this.age = 0;
    this.adjust = 0.05;
  }

  collision(boxes) {
    // set rotation and position targets

    let collision = false;

    for (let i=0; i<boxes.length; i++) {
      if (boxes[i].collision(this.base)) {
        collision = true;
        break;
      }
    }

    this.target.position.y = (collision) ? -1 : this.target.position.y;
  }

  update(delta) {
    // update cell

    this.position.y += (this.target.position.y - this.position.y) * this.adjust;
    //this.age += delta;
    //this.group.position.y += Math.sin(this.age + (this.position.z + this.position.x * 2) / 10) * 0.01;

    this.group.position.y = this.position.y;
  }

  getMesh() {
    // get mesh reference

    return this.group;
  }
}

export default Cell;
