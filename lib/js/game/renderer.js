/**
 * Render the scene.
 */

class Renderer {
  constructor(scene) {
    this.scene = scene.scene;
    this.camera = scene.camera;
    this.renderer = new THREE.WebGLRenderer({});
    this.renderer.setClearColor(0xffffff, 1);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

export { Renderer };
