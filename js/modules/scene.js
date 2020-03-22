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
    for (let i=0; i<10; i++) {
      const line = new Line(this);
      this.lines.push(line);
    }

    // floor
    this.showHelper();
  }

  showHelper() {
    const geo = new THREE.PlaneBufferGeometry(3, 3, 8, 8);
    const wireframe = new THREE.WireframeGeometry(geo);
    const line = new THREE.LineSegments(wireframe);
    line.rotation.x = Math.PI / 2;
    line.material.depthTest = false;
    this.scene.add(line);

    const s = Config.boxSize / 2;
    const t = Config.boxSize;
    const mat = new THREE.LineBasicMaterial({color: 0xffffff});
    const buffers = [
      [-s, 0, -s, s, 0, -s, s, 0, s, -s, 0, s, -s, 0, -s],
      [-s, t, -s, s, t, -s, s, t, s, -s, t, s, -s, t, -s],
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

  update(delta) {}
}

export default Scene;
