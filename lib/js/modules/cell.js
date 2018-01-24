class Cell {
  constructor(x, z, radius) {
    // interactive cell

    this.group = new THREE.Group();
    this.base = new THREE.Vector3(x, Math.random() - 0.55, z);
    this.position = this.base.clone();
    this.target = {
      position: this.base.clone(),
      rotation: new THREE.Vector3()
    };
    this.maxHeight = 1 - (2 * (radius - 0.3));

    // add components to group

    this.radius = radius + Math.random() * radius;
    const mat = new THREE.ShaderMaterial(THREE.DepthShader);
    const cylinder = new THREE.Mesh(new THREE.CylinderBufferGeometry(this.radius, this.radius, 4, 14), mat);
    const cap = new THREE.Mesh(new THREE.SphereBufferGeometry(this.radius, 14, 14), mat);
    cap.position.set(0, 2, 0);
    this.group.add(cap, cylinder);
    this.group.position.set(this.position.x, this.position.y, this.position.z);

    // logic set up

    this.age = 0;
    this.adjust = 0.05;
    this.excited = false;
    this.sway = Math.random() * Math.PI * 2;
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

    this.excited = collision;
  }

  update(delta, mouse) {
    // update cell

    this.age += delta;

    // set position & rotation

    this.position.y += (this.target.position.y - this.position.y) * this.adjust;

    if (this.excited || this.base.distanceTo(mouse) < 1.2) {
      this.target.position.y = this.maxHeight;
      this.group.rotation.x += (Math.random() - 0.5) * 0.04;
      this.group.rotation.y += (Math.random() - 0.5) * 0.04;
    } else {
      this.target.position.y = this.base.y;
      if (Math.abs(this.group.rotation.x) > 0.1) {
        this.group.rotation.x *= 0.9;
      }
      this.group.rotation.y += Math.sin(this.age + (this.base.x + this.base.z + this.sway)) * 0.002;
      this.group.rotation.x += Math.cos(this.age + (this.base.x + this.sway)) * 0.002;
    }

    this.group.position.y = this.position.y;
  }

  getMesh() {
    // get mesh reference

    return this.group;
  }
}

export default Cell;
