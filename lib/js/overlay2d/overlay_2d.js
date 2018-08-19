import { Node } from './node';

class Overlay2D {
  constructor() {
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('2d');
    document.body.appendChild(this.cvs);

    // props
    this.nodes = [];
    this.step = 8;
    this.fps = 30;
    this.frameInterval = Math.floor(1000 / this.fps);
    this.active = true;
    this.time = {now: (new Date()).getTime()};
    this.cursor = {active:false, x:0, y:0, target:{x: 0, y: 0}, length:0, threshold:5};

    // events
    window.addEventListener('resize', () => { this.resize(); });
    document.body.addEventListener('mousemove', (e) => { this.mouseMove(e.clientX, e.clientY); });
    document.querySelectorAll('.section__inner').forEach(e => {
      e.addEventListener('mouseenter', (e) => { this.onMouseEnter(e.currentTarget); });
    });
    this.resize();
    this.loop();
  }

  onMouseEnter(e) {
    const rect = e.getBoundingClientRect();
    for (var i=0; i<200; ++i) {
      const x = rect.left + Math.random() * rect.width;
      const y = rect.top + Math.random() * rect.height;
      this.nodes.push(new Node(x, y, 100));
    }
  }

  resize() {
    this.cvs.width = window.innerWidth;
    this.cvs.height = window.innerHeight;
  }

  mouseMove(x, y) {
    if (!this.cursor.active) {
      this.cursor.active = true;
      this.cursor.x = x;
      this.cursor.y = y;
      this.cursor.target.x = x;
      this.cursor.target.y = y;
    } else {
      this.cursor.target.x = x;
      this.cursor.target.y = y;
    }
  }

  activate() {
    if (!this.active) {
      this.time.now = (new Date()).getTime();
      this.active = true;
    }
  }

  update(delta) {
    for (var i=this.nodes.length-1, lim=-1; i>lim; --i) {
      this.nodes[i].update(delta);
      if (!this.nodes[i].isActive()) {
        this.nodes.splice(i, 1);
      }
    }

    // move cursor
    this.cursor.x += (this.cursor.target.x - this.cursor.x) * 0.3;
    this.cursor.y += (this.cursor.target.y - this.cursor.y) * 0.3;
    this.cursor.length = Math.sqrt(Math.pow(this.cursor.target.x - this.cursor.x, 2) + Math.pow(this.cursor.target.y - this.cursor.y, 2));

    // create nodes
    if (this.cursor.length > this.cursor.threshold) {
      this.nodes.push(new Node(this.cursor.x, this.cursor.y, this.cursor.length));
      this.activate();
    }
  }

  draw() {
    // style
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
    this.ctx.strokeStyle = '#000';
    for (var i=0, len=this.nodes.length; i<len; ++i) {
      this.nodes[i].draw(this.ctx);
    }
    //this.ctx.fillRect(this.cursor.x - 2, this.cursor.y - 2, 4, 4);
  }

  loop() {
    setTimeout(() => { this.loop(); }, this.frameInterval);
    const t = (new Date()).getTime();
    const delta = (t - this.time.now) / 1000;
    this.time.now = t;
    this.update(delta);
    if (this.active) {
      this.draw();
      this.active = this.nodes.length > 0;
    }
  }
}

export { Overlay2D };
