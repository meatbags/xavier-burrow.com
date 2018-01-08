
class Scene {
  constructor() {
    // scene handler

    this.scene = new THREE.Scene();

    // add objects

    for (let x=-10; x<10; x+=0.6) {
      for (let z=-10; z<10; z+=2) {
        const block = new THREE.Mesh(
          new THREE.BoxBufferGeometry(0.2, 1 + Math.random() * 16, 0.2),
          new THREE.ShaderMaterial(THREE.DepthShader)
        );
        block.position.set(x * 2 + Math.random() * 2, 0, z * 2 + Math.random() * 2);
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
