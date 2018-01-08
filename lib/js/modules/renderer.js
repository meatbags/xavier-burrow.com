class Renderer {
  constructor(scene, camera) {
    // render handler with post-processing passes

    this.scene = scene;
    this.camera = camera;

    // three webgl setup

    this.mode = 'dev';
    this.width = (this.mode == 'dev') ? 960 : window.innerWidth;
    this.height = (this.mode == 'dev') ? 540 : window.innerHeight;
    this.size = new THREE.Vector2(this.width, this.height);
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x0, 1);

    // post-processing

    this.pass = {
      render: new THREE.RenderPass(this.scene, this.camera),
      //fxaa: new THREE.ShaderPass(THREE.FXAAShader),
      bloom: new THREE.UnrealBloomPass(new THREE.Vector2(this.width, this.height), 1.0, 1.2, 0.8)
    };
    this.pass.bloom.renderToScreen = true;
    this.composer = new THREE.EffectComposer(this.renderer);

    // add passes

    for (let prop in this.pass) {
      if (this.pass.hasOwnProperty(prop)) {
        this.composer.addPass(this.pass[prop]);
      }
    }
  }

  resize(width, height) {
    // set size

    this.width = width;
    this.height = height;
    this.renderer.setSize(width, height);
    this.composer.setSize(width, height);
    this.pass.bloom.setSize(width, height);
  }

  render(delta) {
    // render

    this.composer.render(delta);
  }

  getDOMElement() {
    // get DOM target

    return this.renderer.domElement;
  }
}

export default Renderer;
