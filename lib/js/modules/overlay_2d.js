import { GridNode } from './grid_node';

class Overlay2D {
  constructor(isMobile) {
    this.isMobile = isMobile;
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('2d');
    document.body.appendChild(this.cvs);

    // props
    this.nodes = [];
    this.lineWidth = 1;
    this.strokeStyle = '#888';
    this.fillStyle = '#888';
    this.step = 8;
    this.fps = 30;
    this.frameInterval = Math.floor(1000 / this.fps);
    this.active = true;
    this.time = {now: (new Date()).getTime()};
    this.cursor = {active:false, x:0, y:0, target:{x: 0, y: 0}, length:0, threshold:10};
    this.activeSection = null;
    this.nodeCountMax = 80;
    this.nodeCountClick = 30;

    // events
    window.addEventListener('resize', () => { this.resize(); });
    document.body.addEventListener('mousemove', (e) => { this.onMouseMove(e.clientX, e.clientY); });
    document.body.addEventListener('click', (e) => { this.onMouseClick(e.clientX, e.clientY); });
    document.querySelectorAll('.section__inner').forEach(e => {
      e.addEventListener('mouseenter', (e) => { this.onMouseEnter(e.currentTarget); });
      e.addEventListener('mouseleave', (e) => { this.onMouseLeave(e.currentTarget); });
    });
    this.resize();
    this.loop();
  }

  onMouseLeave(e) {
    this.activeSection = null;
  }

  onMouseEnter(e) {
    this.activeSection = e;
  }

  onMouseClick(x, y) {
    const dist = 10 + Math.random() * 50;
    for (var i=0; i<this.nodeCountClick; ++i) {
      const angle = Math.random() * Math.PI * 2;
      this.nodes.push(new GridNode(x + Math.cos(angle) * dist, y + Math.sin(angle) * dist, 50));
    }
  }

  onMouseMove(x, y) {
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

    // create nodes under active section
    if (this.activeSection !== null && !this.isMobile && this.nodes.length < this.nodeCountMax) {
      const n = this.nodeCountMax - this.nodes.length;
      const rect = this.activeSection.querySelector('.image-card').getBoundingClientRect();
      for (var i=0; i<n; ++i) {
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;
        this.nodes.push(new GridNode(x, y, 100));
      }
    }

    // create extra nodes
    if (this.cursor.length > this.cursor.threshold) {
      this.nodes.push(new GridNode(this.cursor.x, this.cursor.y, this.cursor.length));
    }
  }

  draw() {
    // reset
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
    this.ctx.strokeStyle = this.strokeStyle;
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.lineWidth = this.lineWidth;

    // draw nodes
    for (var i=0, len=this.nodes.length; i<len; ++i) {
      this.nodes[i].draw(this.ctx);
    }
  }

  resize() {
    this.cvs.width = window.innerWidth;
    this.cvs.height = window.innerHeight;
  }

  scatter() {
    // scatter random nodes across the screen
    for (var i=0; i<20; ++i) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      this.nodes.push(new Node(x, y, 200));
    }
  }

  loop() {
    setTimeout(() => { this.loop(); }, this.frameInterval);
    const t = (new Date()).getTime();
    const delta = (t - this.time.now) / 1000;
    this.time.now = t;
    this.update(delta);
    this.draw();
  }
}

export { Overlay2D };
