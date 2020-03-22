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
      //const line = new Line(this);
      //this.lines.push(line);
    }

    // floor
    this.showHelper();
  }

  showHelper() {
    const mesh = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), new THREE.MeshStandardMaterial());
    this.scene.add(mesh);
    /*
    var geometry = new THREE.SphereBufferGeometry(100, 100, 100);
    const wireframe = new THREE.WireframeGeometry(geometry);
    const line = new THREE.LineSegments(wireframe);
    line.material.depthTest = false;
    line.material.opacity = 0.25;
    line.material.transparent = true;
    this.scene.add(line);


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
    */
  }

  update(delta) {}
}

export default Scene;
