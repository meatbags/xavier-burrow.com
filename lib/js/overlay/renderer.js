/**
 * Render the scene.
 */

class Renderer {
  constructor(scene) {
    this.scene = scene.scene;
    this.camera = scene.camera;
    this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: false});
    this.renderer.setClearColor(0xffffff, 0);
    this.renderer.domElement.classList.add('ui-canvas');
    this.resize();
    window.addEventListener('resize', () => { this.resize(); });
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setSize(this.width, this.height);
  }

  getElement() {
    return this.renderer.domElement;
  }
}

export { Renderer };
