class Grid2D {
  constructor() {
    this.scrollTop = document.documentElement.scrollTop;
    this.needsUpdate = true;
    this.colour = '#44f';
    this.step = 40;

    // doc
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('2d');
    this.cvs.classList.add('canvas-2d');
    this.ctx.imageSmoothingEnabled = false;
    this.target = {
      doc: document.documentElement,
      sections: document.querySelectorAll('.section')
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
  }

  drawGrid() {
    var ystart = 0; //-(this.scrollTop * 0.75 % this.step);
    var xstart = 0;
    var step = this.step / 32;
    this.ctx.fillStyle = this.colour;
    for (var y=ystart, ylim=this.cvs.height; y<ylim; y+=step) {
      this.ctx.fillRect(0, Math.floor(y), this.cvs.width, 1);
      step *= 1.1;
    }
    step = this.step;
    for (var x=xstart, xlim=this.cvs.width; x<xlim; x+=step) {
      this.ctx.fillRect(x, 0, 1, this.cvs.height);
    }

    for (var i=0, len=this.target.sections.length; i<len; ++i) {
      const rect = this.target.sections[i].getBoundingClientRect();
      if (rect.top > 0 && rect.top < this.cvs.height) {
        const w = (rect.left - xstart) - this.step;
        const h = (rect.top - ystart) + this.step * 2;
        const x = xstart + (w - (w % this.step));
        const y = ystart + (h - (h % this.step));
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.step/4, 0, Math.PI * 2);
        this.ctx.fill();
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
