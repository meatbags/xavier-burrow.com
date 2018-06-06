/**
 * An interactive grid cell.
 */

class Cell {
  constructor(x, z, radius) {
    // interactive cell
    this.group = new THREE.Group();
    this.base = new THREE.Vector3(x, Math.random() * 0.5 - 0.55, z);
    this.position = this.base.clone();
    this.target = {
      position: this.base.clone(),
      rotation: new THREE.Vector3(),
      scale: new THREE.Vector3(1, 1, 1)
    };
    this.maxHeight = 1 - (2 * (radius - 0.3));
    this.mouseRadius = 2;

    // add components to group
    this.radius = radius / 2 + Math.random() * radius / 2;
    const sides = Math.round(Math.random() * 4) + 4;
    const mat = new THREE.ShaderMaterial(THREE.DepthShader);
    const cylinder = new THREE.Mesh(new THREE.CylinderBufferGeometry(this.radius, this.radius, 4, sides), mat);
    //const cap = new THREE.Mesh(new THREE.SphereBufferGeometry(this.radius, sides, sides), mat);
    //cap.position.set(0, 2, 0);
    this.group.add(cylinder);
    //this.group.add(cap);
    this.group.position.set(this.position.x, this.position.y, this.position.z);
    this.group.rotation.y = Math.random() * Math.PI;

    // logic set up
    this.age = 0;
    this.adjust = 0.05;
    this.excited = false;
    this.sway = Math.random() * Math.PI * 2;
  }

  collision(boxes) {
    // set rotation and position targets
    var collision = false;
    for (var i=0, len=boxes.length; i<len; ++i) {
      if (boxes[i].collision(this.base)) {
        collision = true;
        break;
      }
    }
    this.excited = collision;
  }

  tween(from, to, amount) {
    from.x += (to.x - from.x) * amount;
    from.y += (to.y - from.y) * amount;
    from.z += (to.z - from.z) * amount;
  }

  update(delta, mouse) {
    // update cell
    this.age += delta;

    // set position & rotation
    this.tween(this.group.position, this.target.position, this.adjust);
    this.tween(this.group.scale, this.target.scale, this.adjust);

    if (this.excited || this.base.distanceTo(mouse) < this.mouseRadius) {
      this.target.scale.z = 0.5;
      this.target.scale.x = 0.5;
      this.target.position.y = this.maxHeight;
      this.group.rotation.x += (Math.random() - 0.5) * 0.04;
      this.group.rotation.y += (Math.random() - 0.5) * 0.04;
    } else {
      this.target.scale.z = 1;
      this.target.scale.x = 1;
      const yfactor = Math.sin(this.age + (this.base.x + this.base.z + this.sway));
      this.target.position.y = this.base.y;
      if (Math.abs(this.group.rotation.x) > 0.1) {
        this.group.rotation.x *= 0.9;
      }
      this.group.rotation.y += Math.sin(this.age + (this.base.x + this.base.z + this.sway)) * 0.002;
      this.group.rotation.x += Math.cos(this.age + (this.base.x + this.sway)) * 0.002;
    }
  }

  getMesh() {
    return this.group;
  }
}

export { Cell };
