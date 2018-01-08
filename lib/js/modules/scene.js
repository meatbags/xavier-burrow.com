
class Scene {
  constructor() {
    // scene handler

    this.scene = new THREE.Scene();

    // add objects

    for (let x=-10; x<10; x++) {
      for (let z=-10; z<10; z++) {
        const block = new THREE.Mesh(
          new THREE.BoxBufferGeometry(0.5, 1 + Math.random() * 2, 0.5),
          new THREE.MeshPhongMaterial({})
        );
        block.position.set(x * 2, 0, z * 2);
        this.scene.add(block);
      }
    }

    // lights

    const light = new THREE.PointLight(0xffffff, 1, 30, 2);
    light.position.set(0, 2, 0);
    this.scene.add(light, new THREE.AmbientLight(0xffffff, 0.2));
  }

  update(delta) {
    // update scene
  }

  getScene() {
    // get scene reference

    return this.scene;
  }
}

export default Scene;
