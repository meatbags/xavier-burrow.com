/** Scene */

import Config from './config';
import * as THREE from 'three';
import Clamp from '../util/clamp';
import Line from './line';

class Scene {
  constructor() {
    this.maxParticles = 1000;
    this.scene = new THREE.Scene();
  }

  bind(root) {
    this.ref = {};
    this.particles = [];

    // line
    this.lines = [];
    for (let i=0; i<3; i++) {
      const line = new Line(this);
      this.lines.push(line);
    }

    // floor
    this.showHelper();
  }

  showHelper() {
    const s = Config.boxSize;
    const mat = new THREE.LineBasicMaterial({color: 0xffffff});
    const buffers = [
      [-s, -s, -s, s, -s, -s, s, -s, s, -s, -s, s, -s, -s, -s],
      [-s, s, -s, s, s, -s, s, s, s, -s, s, s, -s, s, -s],
    ];
    buffers.forEach(buffer => {
      const points = new Float32Array(buffer.length);
      const geo = new THREE.BufferGeometry();
      points.set(buffer);
      geo.setAttribute('position', new THREE.BufferAttribute(points, 3));
      const lines = new THREE.Line(geo, mat);
      lines.geometry.attributes.position.needsUpdate = true;
      lines.geometry.computeBoundingSphere();
      this.scene.add(lines);
    });
  }

  getLineMesh(a, b) {
    const geo = new THREE.BufferGeometry().setFromPoints([a, b]);
    const mat = new THREE.LineBasicMaterial({color: 0xffffff});
    const mesh = new THREE.Line(geo, mat);
    return mesh;
  }

  update(delta) {
    for (let i=this.lines.length-1; i>-1; --i) {
      const line = this.lines[i];
      line.update(delta);
      if (line.destroyFlag) {
        line.destroy();
        this.lines.splice(i, 1);
      }
    }

    if (Math.random() > 0.98) {
      this.lines.push(new Line(this));
    }
  }
}

export default Scene;
