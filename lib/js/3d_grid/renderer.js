/**
 * Renders the scene.
 */

class Renderer {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.mode = 'dev';
    this.width = (this.mode == 'dev') ? 960 : window.innerWidth;
    this.height = (this.mode == 'dev') ? 540 : window.innerHeight;
    this.size = new THREE.Vector2(this.width, this.height);
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(this.width, this.height);
    //this.renderer.setClearColor(0x0, 1);

    // post-processing
    this.pass = {
      render: new THREE.RenderPass(this.scene, this.camera),
      bloom: new THREE.UnrealBloomPass(new THREE.Vector2(this.width, this.height), 1.0, 1.2, 0.95)
    };
    this.pass.render.renderToScreen = true;
    this.composer = new THREE.EffectComposer(this.renderer);
    this.composer.addPass(this.pass.render);
    //this.composer.addPass(this.pass.bloom);
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
    this.renderer.setSize(width, height);
    this.composer.setSize(width, height);
    this.pass.bloom.setSize(width, height);
  }

  render(delta) {
    this.composer.render(delta);
  }
}

export { Renderer }
