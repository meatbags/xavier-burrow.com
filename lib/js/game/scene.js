/**
 * Set up three scene.
 */

class Scene {
  constructor(onload) {
    this.onload = onload;
    this.scene = new THREE.Scene();
    this.load();

    // camera
    this.fov = 120;
    this.camera = new THREE.PerspectiveCamera(this.fov, 1.0, 0.1, 1000.0);
    this.camera.position.set(1, 1, 1);
    this.camera.lookAt(new THREE.Vector3(0, 0.25, 0));

    // resize camera
    this.resize();
    window.addEventListener('resize', () => { this.resize(); });

    // lights
    this.lights = {
      ambient: new THREE.AmbientLight(0xffffff, 0.125),
      p1: new THREE.PointLight(0xffffff, 1.0, 50, 2),
      p2: new THREE.PointLight(0xffffff, 0.5, 50, 2),
      p3: new THREE.PointLight(0xff0000, 0.5, 50, 2),
      //p4: new THREE.PointLight(0x0000ff, 0.5, 50, 2),
    };
    this.lights.p1.position.set(0, 1.5, 2.5);
    this.lights.p2.position.set(10, 5, 0);
    this.lights.p3.position.set(2, -5, 10);
    //this.lights.p4.position.set(-10, 0, -1);
    Object.keys(this.lights).forEach(key => this.scene.add(this.lights[key]));

    // attrs
    this.time = 0;
  }

  load() {
    const pi2 = Math.PI * 2;
    const rand = (n) => { return Math.random() * n; };
    const mat = new THREE.MeshStandardMaterial({opacity: 0.5, metalness: 0.75, roughness: 0.5, side: THREE.DoubleSide, wireframe: false});
    const OBJloader = new THREE.OBJLoader();

    OBJloader.load(`${themePath}/lib/assets/hand.obj`, (obj) => {
      obj.children.forEach(child => {
        child.material = mat;
      });
      this.hand = {
        a: obj,
        b: obj.clone()
      };
      this.hand.a.scale.set(3, 3, 3);
      this.hand.a.rotation.set(rand(pi2), rand(pi2), rand(pi2));
      this.hand.b.scale.set(0.5, 0.5, 0.5);
      this.hand.b.rotation.set(rand(pi2), rand(pi2), rand(pi2));
      this.scene.add(this.hand.a, this.hand.b);

      // trigger onload event
      this.onload();
    }, null, (err) => { console.log(err); });
  }

  update(delta) {
    this.time += delta;
    if (this.hand) {
      this.hand.a.rotation.y -= 1 / 100 * delta;
      this.hand.a.rotation.x -= 1 / 80 * delta;
      this.hand.a.rotation.z -= 1 / 120 * delta;
      this.hand.b.rotation.y += 1 / 100 * delta;
      this.hand.b.rotation.x += 1 / 80 * delta;
      this.hand.b.rotation.z -= 1 / 120 * delta;
    }
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }
}

export { Scene };
