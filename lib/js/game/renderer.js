/**
 * Render the scene.
 */

class Renderer {
  constructor(scene) {
    this.scene = scene.scene;
    this.camera = scene.camera;
    this.renderer = new THREE.WebGLRenderer({alpha: true});
    this.renderer.setClearColor(0xffffff, 0);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

export { Renderer };
