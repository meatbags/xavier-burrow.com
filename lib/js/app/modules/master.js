
class Master {
  constructor() {
    // check for mobiles
    this.isMobile = window.mobilecheck();

    // set up context
    this.mode = 'dev';
    this.width = (this.mode == 'dev') ? 800 : window.innerWidth;
    this.height = (this.mode == 'dev') ? 600 : window.innerHeight;
    this.size = new THREE.Vector2(this.width, this.height);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x0, 1);

    // DOM
    document.getElementById('body').appendChild(this.renderer.domElement);
  }
}

export default Master;
