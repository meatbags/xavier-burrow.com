/** Line */

import * as THREE from 'three';
import Config from './config';
import Clamp from '../util/clamp';

class Line {
  constructor(root) {
    const points = 1 + Math.floor(Math.random() * 100);
    const speed = (0.5 + Math.random() * 1) * (Math.random() > 0.5 ? 1 : -1);
    const jump = 0.1 + Math.random() * 0.4;

    // create buffer
    const floatingPoint = new THREE.Vector3();
    const buffer = new Float32Array(points * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(buffer, 3));
    const mat = new THREE.LineBasicMaterial({color: 0xffffff});
    this.line = new THREE.Line(geo, mat);

    // set buffer data
    const delta = 1/60;
    for (let i=0, lim=points*3; i<lim; i+=3) {
      floatingPoint.x += (Math.random() - 0.5) * jump;
      floatingPoint.y += (Math.random() - 0.5) * jump + speed * delta;
      floatingPoint.z += (Math.random() - 0.5) * jump;
      buffer[i+0] = floatingPoint.x;
      buffer[i+1] = floatingPoint.y;
      buffer[i+2] = floatingPoint.z;
    }
    geo.setDrawRange(0, points);
    geo.attributes.position.needsUpdate = true;

    // create line
    const x = (Math.random() - 0.5) * Config.boxSize;
    const y = Math.random() * Config.boxSize;
    const z = (Math.random() - 0.5) * Config.boxSize;
    this.line.position.set(x, y, z);
    
    // add to scene
    root.scene.add(this.line);
  }
}

export default Line;
