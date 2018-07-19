class Graphic {
  constructor() {
    this.step = 16;
    this.image = new Image();
    this.cvs = document.createElement('canvas');
    this.cvs.style.position = 'fixed';
    this.ctx = this.cvs.getContext('2d');
    this.image.onload = () => {
      this.cvs.width = Math.floor(this.image.width * 1.5);
      this.cvs.height = Math.floor(this.image.height * 1.5);
      this.resize();
      this.draw(1);
      document.body.addEventListener('mousemove', (e) => { this.onMouseMove(e); });
    };
    this.image.src = `${themePath}/lib/img/graphic3.jpg`;
    document.body.appendChild(this.cvs);
  }

  resize() {
    const x = Math.floor((window.innerWidth / 2 - this.cvs.width / 2) / this.step) * this.step;
    const y = Math.floor((window.innerHeight / 2 - this.cvs.height / 2) / this.step) * this.step;
    this.cvs.style.left = `${x}px`;
    this.cvs.style.top = `${y}px`;
  }

  onMouseMove(e) {
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    const max = Math.hypot(x, y);
    const mag = (1.0 - Math.hypot(x - e.clientX, y - e.clientY) / max) * 4.0;
    this.draw(mag);
  }

  draw(factor) {
    const step = this.step;
    const baseX = (this.cvs.width - this.image.width) / 2;
    const baseY = (this.cvs.height - this.image.height) / 2;
    for (var x=0, xlim=this.cvs.width; x<xlim; x+=step) {
      for (var y=0, ylim=this.cvs.height; y<ylim; y+=step) {
        const off = Math.random() * step * factor;
        const px = baseX + x + (Math.random() > 0.25 ? Math.random() > 0.5 ? off : -off : 0);
        const py = baseY + y + (Math.random() > 0.25 ? Math.random() > 0.5 ? off : -off : 0);
        this.ctx.drawImage(this.image, x, y, step, step, px, py, step, step);
      }
    }
  }
}

export { Graphic };
