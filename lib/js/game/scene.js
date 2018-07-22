/**
 * Game scene & camera.
 */

import { ObjLoader } from './obj_loader';
import { NoiseShader } from './noise_shader';

class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.load();

    // camera
    this.fov = 45;
    this.camera = new THREE.PerspectiveCamera(this.fov, 1.0, 0.1, 1000.0);
    this.plane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(10, 10, 20, 20),
      new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true})
    );
    this.plane.position.y = 0;
    this.plane.rotation.x = Math.PI / 2;
    //this.scene.add(this.plane);
    this.camera.position.x = 0;//1.25;
    this.camera.position.y = 1.45;
    this.camera.position.z = 2.25;
    this.camera.lookAt(this.plane.position);

    // resize camera
    this.resize();
    window.addEventListener('resize', () => { this.resize(); });

    // lights
    this.lights = {
      ambient: new THREE.AmbientLight(0xffffff, 0.125),
      p1: new THREE.PointLight(0xffffff, 1.0, 50, 2),
      p2: new THREE.PointLight(0xffffff, 0.5, 50, 2),
      p3: new THREE.PointLight(0x8888ff, 0.5, 50, 2),
    };
    this.lights.p1.position.set(0, 1.5, 2.5);
    this.lights.p2.position.set(5, 5, 0);
    this.lights.p3.position.set(2, -5, 10);
    Object.keys(this.lights).forEach(key => this.scene.add(this.lights[key]));

    // attrs
    this.time = 0;
  }

  load() {
    /*
    const loader = new THREE.OBJLoader();
    loader.load(`${themePath}/lib/assets/hand.obj`, (obj) => {
      const mat = new THREE.MeshStandardMaterial({color: 0xf0a022, roughness: 0.25, metalness: 0.75, opacity: 0.95, transparent: true});
      this.hand = new THREE.Mesh(obj.children[0].geometry, mat);
      this.hand.rotation.y = Math.PI / 3;
      this.hand.scale.set(0.125, 0.125, 0.125);
      this.hand.position.y = 1;
      this.scene.add(this.hand);
    }, null, (err) => { console.log(err); });
    */

    const objLoader = new ObjLoader();
    objLoader.load('computer').then((obj) => {
      this.computer = obj.children[0];
      // grab texture and swap to standard material
      const mat = new THREE.MeshStandardMaterial({});
      mat.map = this.computer.material.map;
      mat.roughness = 0.5;
      mat.metalness = 0.25;
      this.computer.material = mat;
      this.scene.add(this.computer);

      // add noise
      this.noiseShader = new THREE.ShaderMaterial({
        uniforms: {t: {value: 0.0}},
        vertexShader: NoiseShader.vertexShader,
        fragmentShader: NoiseShader.fragmentShader
      });
      const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(0.8, 0.7), this.noiseShader);
      plane.position.set(-0.25, 0.6, 0.275);
      this.computer.add(plane);
    }, (err) => {
      console.log(err);
    });
  }

  update(delta) {
    this.time += delta;
    if (this.computer) {
      this.noiseShader.uniforms['t'].value = this.time;
      //this.computer.rotation.y += Math.PI / 24 * delta;
    }
    /*
    this.plane.rotation.z += Math.PI / 16 * delta;
    if (this.hand) {
      this.hand.rotation.y -= Math.PI / 12 * delta;
    }
    */
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }
}

export { Scene };
