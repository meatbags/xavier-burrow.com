class Grid2D {
  constructor() {
    this.scrollTop = document.documentElement.scrollTop;
    this.needsUpdate = true;
    this.step = 64;

    // doc
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('2d');
    this.cvs.classList.add('canvas-2d');
    this.ctx.imageSmoothingEnabled = false;
    this.target = {
      doc: document.documentElement,
      sections: null
    };
    this.resize();
    document.body.appendChild(this.cvs);
  }

  onscroll() {
    if (this.target.doc.scrollTop != this.scrollTop) {
      this.scrollTop = this.target.doc.scrollTop;
      this.needsUpdate = true;
    }
  }

  handleMouse(x, y) {
    
  }

  resize() {
    this.cvs.width = window.innerWidth;
    this.cvs.height = window.innerHeight;
    this.needsUpdate = true;
    this.target.sections = Array.from(document.querySelectorAll('.section')).map(e => {
      const rect = e.getBoundingClientRect();
      return {x: rect.left, y: rect.top};
    });
  }

  drawGrid() {
    var ystart = -(this.scrollTop % this.step);
    var xstart = 0;
    this.ctx.fillStyle = '#00f';
    for (var y=ystart, ylim=this.cvs.height; y<ylim; y+=this.step) {
      this.ctx.fillRect(0, y, this.cvs.width, 1);
    }
    for (var x=xstart, xlim=this.cvs.width; x<xlim; x+=this.step) {
      this.ctx.fillRect(x, 0, 1, this.cvs.height);
    }

    for (var i=0, len=this.target.sections.length; i<len; ++i) {
      const coord = this.target.sections[i];
      if (coord.y > 0 && coord.y < this.cvs.height) {
        const x = xstart + (coord.x - (coord.x % this.step));
        const y = ystart + (coord.y - (coord.y % this.step));
        this.ctx.fillRect(x, y, this.step/2, this.step/2);
      }
    }
  }

  update(delta) {
    if (this.needsUpdate) {
      this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
      this.drawGrid();
      this.needsUpdate = false;
    }
  }
}

export { Grid2D };
