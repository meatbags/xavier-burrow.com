/** Scene */

import * as THREE from 'three';
import Config from './config';
import Clamp from '../util/clamp';
import Line from './line';
import WireframeMaterial from '../material/wireframe_material';
import CreateWireframeGroup from '../material/create_wireframe_group';
import MaterialHandler from './material_handler';
import Loader from '../loader/loader';

class Scene {
  constructor() {
    this.maxParticles = 1000;
    this.scene = new THREE.Scene();
    this.loader = new Loader('assets');
    this.materialHandler = new MaterialHandler();
  }

  bind(root) {
    this.ref = {};
    this.particles = [];

    // lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.25);
    const dir1 = new THREE.DirectionalLight(0xffffff, 0.25, 2);
    const dir2 = new THREE.DirectionalLight(0xffffff, 0.25, 2);
    const dir3 = new THREE.DirectionalLight(0xffffff, 0.125, 2);
    dir1.position.set(-1, 0, -1);
    dir2.position.set(1, -0.5, 0.5);
    dir3.position.set(0, 0.5, 0.25);
    this.scene.add(ambient, dir1, dir2, dir3);

    // line
    this.lines = [];
    for (let i=0; i<10; i++) {
      const line = new Line(this);
      this.lines.push(line);
    }

    // assets
    this.loader.loadFBX('wall.fbx').then(obj => {
      this.materialHandler.processObject(obj);
      this.scene.add(obj);
      this.init();
    });
  }

  init() {
    // floor/ roof
    const mat = this.materialHandler.getMaterial('plaster');
    const roof = new THREE.Mesh(new THREE.BoxBufferGeometry(100, 0.125, 100), mat);
    const floor = new THREE.Mesh(new THREE.BoxBufferGeometry(100, 0.5, 100), mat);
    roof.position.y = 4;
    floor.position.y = -0.251;
    this.scene.add(roof, floor);
  }

  showHelper() {
    const geo = new THREE.BoxBufferGeometry(1, 1, 1);
    const group = CreateWireframeGroup(geo);
    this.scene.add(group);

    //const mesh = new THREE.Mesh(geo, WireframeMaterial);
    //mesh.rotation.x = Math.PI / 2;
    //this.scene.add(mesh);

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
}

export default Scene;
