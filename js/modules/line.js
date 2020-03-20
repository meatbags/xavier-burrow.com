/** Line */

import * as THREE from 'three';
import Config from './config';
import Clamp from '../util/clamp';

class Line {
  constructor(root) {
    this.active = true;
    this.destroyFlag = false;
    this.maxPoints = 500;
    this.floatingPoint = new THREE.Vector3();
    const x = (Math.random() - 0.5) * Config.boxSize * 2;
    const y = (Math.random() - 0.5) * Config.boxSize;
    const z = (Math.random() - 0.5) * Config.boxSize * 2;
    this.floatingPoint.set(x, y, z);
    this.buffer = [];
    this.points = new Float32Array(this.maxPoints * 3);
    this.speed = (5 + Math.random() * 10) * (Math.random() > 0.5 ? 1 : -1);
    this.luck = 0.75 + Math.random() * 0.2;
    this.jump = 0.25 + Math.random() * 2.5;

    // init mesh
    this.geo = new THREE.BufferGeometry();
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.points, 3));
    const mat = new THREE.LineBasicMaterial({color: 0xffffff});
    this.line = new THREE.Line(this.geo, mat);
    this.geo.setDrawRange(0, 0);
    this.geo.attributes.position.needsUpdate = true;

    // add to scene
    this.root = root;
    this.root.scene.add(this.line);
  }

  destroy() {
    this.root.scene.remove(this.line);
  }

  update(delta) {
    if (this.active) {
      // move floating point
      const x = this.floatingPoint.x + (Math.random() - 0.5) * this.jump;
      const y = this.floatingPoint.y + (Math.random() - 0.5) * this.jump;
      const z = this.floatingPoint.z + (Math.random() - 0.5) * this.jump;
      this.floatingPoint.x = Clamp(x, -Config.boxSize, Config.boxSize);
      this.floatingPoint.y = Clamp(y, -Config.boxSize, Config.boxSize);
      this.floatingPoint.z = Clamp(z, -Config.boxSize, Config.boxSize);

      // add point to line
      if (Math.random() > this.luck) {
        this.buffer.push(this.floatingPoint.x, this.floatingPoint.y, this.floatingPoint.z);

        // limit size
        if (this.buffer.length / 3 > this.maxPoints) {
          this.buffer = this.buffer.slice(3, this.maxPoints * 3);
        }

        // switch off
        if (Math.random() < 0.025) {
          this.active = false;
        }
      }
    }

    // shift buffer
    const dy = delta * this.speed;
    for (let i=this.buffer.length-3; i>-1; i-=3) {
      this.buffer[i + 1] -= dy;
      const y = this.buffer[i + 1];
      if (y < -Config.boxSize || y > Config.boxSize) {
        this.buffer.splice(0, i);
        break;
      }
    }

    // set geometry
    this.points.set(this.buffer);
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.points, 3));
    this.geo.setDrawRange(0, this.buffer.length / 3);
    this.geo.attributes.position.needsUpdate = true;

    // destroy
    if (!this.destroyFlag && !this.active && this.buffer.length <= 3) {
      this.destroyFlag = this.buffer.length == 0 || this.buffer[1] < -Config.boxSize;
    }
  }
}

export default Line;
