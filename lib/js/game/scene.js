/**
 * Game scene & camera.
 */

import { NoiseShader } from './noise_shader';

class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.load();

    // camera
    this.fov = 45;
    this.camera = new THREE.PerspectiveCamera(this.fov, 1.0, 0.1, 1000.0);
    this.plane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(3, 3, 20, 20),
      new THREE.MeshBasicMaterial({color: 0xaaaaaa, wireframe: true})
    );
    this.plane.position.y = 0;
    this.plane.rotation.x = Math.PI / 2;
    //this.scene.add(this.plane);
    this.camera.position.x = 1.25;
    this.camera.position.y = 0.65;
    this.camera.position.z = 2.25;
    this.target = new THREE.Vector3(0, 0.25, 0);
    this.camera.lookAt(this.target);

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
    const texture = new THREE.TextureLoader().load(`${themePath}/lib/assets/texture-blur.jpg`);
    const OBJloader = new THREE.OBJLoader();
    const mat = new THREE.MeshStandardMaterial({metalness: 0.25, roughness: 0.5, map: texture});

    //${themePath}/lib/assets/hand.obj
    OBJloader.load(`${themePath}/lib/assets/computer.obj`, (group) => {
      this.keys = [];
      this.computer = group;
      group.children.forEach(child => {
        child.material = mat;

        // check if key
        const box = new THREE.Box3();
        box.setFromBufferAttribute(child.geometry.attributes.position);
        if (box.getSize().x < 1) {
          this.keys.push(child);
        }
      });
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

      // raycaster
      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();

      window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -((e.clientY / window.innerHeight) * 2 - 1);
        this.mouse.x = x;
        this.mouse.y = y;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        this.keys.forEach(key => { key.position.y = (-key.position.y) * 0.25; });
        this.raycaster.intersectObjects(this.keys).forEach(e => {
          e.object.position.y = (-0.03 - e.object.position.y) * 0.25;
        });
      });
    }, null, (err) => { console.log(err); });
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
