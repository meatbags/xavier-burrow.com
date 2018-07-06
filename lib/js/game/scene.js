/**
 * Game scene & camera.
 */

class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.load();

    // camera
    this.fov = 45;
    this.camera = new THREE.PerspectiveCamera(this.fov, 1.0, 0.1, 1000.0);
    this.plane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(20, 20, 10, 10),
      new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true})
    );
    this.plane.rotation.x = Math.PI / 2;
    this.scene.add(this.plane);
    this.camera.position.x = 10;
    this.camera.position.y = 10;
    this.camera.position.z = 10;
    this.camera.lookAt(this.plane.position);
    this.age = 0;

    // lights
    this.lights = {
      ambient: new THREE.AmbientLight(0xffffff, 0.25),
      p1: new THREE.PointLight(0xffffff, 1.0, 50, 2),
      p2: new THREE.PointLight(0xffffff, 0.5, 50, 2),
      p3: new THREE.PointLight(0x8888ff, 0.5, 50, 2),
    };
    this.lights.p1.position.set(0, 10, 0);
    this.lights.p2.position.set(10, 0, 0);
    this.lights.p3.position.set(5, -5, 10);
    Object.keys(this.lights).forEach(key => this.scene.add(this.lights[key]));
  }

  load() {
    const loader = new THREE.OBJLoader();
    loader.load(`${themePath}/lib/assets/hand.obj`, (obj) => {
      const mat = new THREE.MeshStandardMaterial({color: 0xf0a022, roughness: 0.25, metalness: 0.75, opacity: 0.95, transparent: true});
      this.hand = new THREE.Mesh(obj.children[0].geometry, mat);
      this.hand.rotation.y = Math.PI * 1.5;
      this.scene.add(this.hand);
    }, null, (err) => { console.log(err); });
  }

  update(delta) {
    this.plane.rotation.z += Math.PI / 16 * delta;
    if (this.hand) {
      this.hand.rotation.y -= Math.PI / 12 * delta;
    }
  }

  resize(w, h) {
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }
}

export { Scene };
