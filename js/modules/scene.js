/** Scene */

import Config from './config';
import * as THREE from 'three';
import Clamp from '../util/clamp';

class Scene {
  constructor() {
    this.scene = new THREE.Scene();
  }

  bind(root) {
    this.ref = {};

    // pointer
    const geo = new THREE.BufferGeometry();
    geo.setFromPoints([new THREE.Vector3()]);
    const mat = new THREE.PointsMaterial({size: 1, sizeAttenuation: false});
    this.pointer = new THREE.Points(geo, mat);
    this.pointer.position.z = 50;
    this.scene.add(this.pointer);
    this.showHelper();
  }

  omputeLine() {
    var MAX_POINTS = 500;
    var geometry = new THREE.BufferGeometry();

    // attributes
    var positions = new Float32Array( MAX_POINTS * 3 ); // 3 vertices per point
    geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );

    // draw range
    var drawCount = 2; // draw the first 2 points, only
    geometry.setDrawRange( 0, drawCount );

    // material
    var material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

    // line
    var line = new THREE.Line( geometry,  material );
    scene.add( line );
    var positions = line.geometry.attributes.position.array;

    var x, y, z, index;
    x = y = z = index = 0;

    for ( var i = 0, l = MAX_POINTS; i < l; i ++ ) {
        positions[ index ++ ] = x;
        positions[ index ++ ] = y;
        positions[ index ++ ] = z;
        x += ( Math.random() - 0.5 ) * 30;
        y += ( Math.random() - 0.5 ) * 30;
        z += ( Math.random() - 0.5 ) * 30;
    }
    line.geometry.setDrawRange( 0, newValue );
    line.geometry.attributes.position.needsUpdate = true; // required after the first render
    line.geometry.computeBoundingSphere();
  }

  showHelper() {
    const s = Config.boxSize;
    const mat = new THREE.LineBasicMaterial({color: 0xffffff});
    const buffers = [
      [-s, -s, -s, s, -s, -s, s, s, -s, -s, s, -s, -s, -s, -s],
      [-s, -s, s, s, -s, s, s, s, s, -s, s, s, -s, -s, s],
      [-s, -s, -s, -s, -s, s],
      [-s, s, -s, -s, s, s],
      [s, -s, -s, s, -s, s],
      [s, s, -s, s, s, s],
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

  update(delta) {
    const x = this.pointer.position.x + Math.random() - 0.5;
    const y = this.pointer.position.y + Math.random() - 0.5;
    this.pointer.position.x = Clamp(x, -50, 50);
    this.pointer.position.y = Clamp(y, -50, 50);
  }
}

export default Scene;
