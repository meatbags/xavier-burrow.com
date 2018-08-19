import { Node } from './node';

class Overlay2D {
  constructor() {
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('2d');
    document.body.appendChild(this.cvs);

    // props
    this.nodes = [];
    this.step = 8;
    this.frameInterval = Math.floor(1000 / 24);
    this.active = true;

    // events
    window.addEventListener('resize', () => {
      this.resize();
    });
    document.body.addEventListener('mousemove', (e) => {
      this.mouseMove(e.clientX, e.clientY);
    });

    // run
    this.resize();
    this.loop();
  }

  resize() {
    this.cvs.width = window.innerWidth;
    this.cvs.height = window.innerHeight;
    this.active = true;
  }

  mouseMove(x, y) {
    const node = new Node(x, y);
    this.nodes.push(node);
    this.active = true;
  }

  update() {
    
  }

  draw() {
    // style
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
    this.ctx.strokeStyle = '#00f';
    for (var i=this.nodes.length-1, lim=-1; i>lim; --i) {
      this.nodes[i].draw(this.ctx);
      this.nodes.splice(i, 1);
    }
  }

  loop() {
    setTimeout(() => { this.loop(); }, this.frameInterval);
    if (this.active) {
      this.draw();
      this.active = false;
    }
  }
}

export { Overlay2D };
