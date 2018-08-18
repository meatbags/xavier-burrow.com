class Overlay2D {
  constructor() {
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('2d');
    document.body.appendChild(this.cvs);
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  resize() {
    this.cvs.width = window.innerWidth;
    this.cvs.height = window.innerHeight;
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(window.innerWidth, window.innerHeight);
    this.ctx.stroke();
  }
}

export { Overlay2D };
