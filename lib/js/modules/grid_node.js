/**
 ** Grid graphics node.
 **/

class GridNode {
  constructor(x, y, length) {
    const poster = Math.random() < 0.75 ? 4 : 8;
    const offset = Math.random() * 20;
    this.angle = Math.floor(Math.random() * poster) * (Math.PI / (poster / 2));
    this.x = x + Math.cos(this.angle) * offset;
    this.y = y + Math.sin(this.angle) * offset;
    this.vec = {x: Math.cos(this.angle) * length, y: Math.sin(this.angle) * length};
    this.length = 10 + length * 0.25 * Math.random();
    this.decay = 40;

    // posterise grid position
    this.x = Math.round(this.x / 8) * 8;
    this.y = Math.round(this.y / 8) * 8;

    // randomise type
    this.type = Math.random() < 0.95 ? 1 : 2;
  }

  isActive() {
    return (this.length != 0);
  }

  update(delta) {
    this.x += this.vec.x * delta;
    this.y += this.vec.y * delta;
    this.length = Math.max(0, this.length - this.decay * delta);
  }

  draw(ctx) {
    const x = this.x;
    const y = this.y;
    const xOff = Math.round(Math.cos(this.angle) * this.length * 0.5);
    const yOff = Math.round(Math.sin(this.angle) * this.length * 0.5);
    if (xOff == 0 || yOff == 0) {
      ctx.fillRect(x - xOff, y - yOff, xOff == 0 ? 1 : xOff * 2, yOff == 0 ? 1 : yOff * 2);
    } else {
      ctx.beginPath();
      ctx.moveTo(x - xOff, y - yOff);
      ctx.lineTo(x + xOff, y + yOff);
      ctx.stroke();
    }

    // perpendicular line
    if (this.type == 2) {
      if (xOff == 0 || yOff == 0) {
        ctx.fillRect(x - yOff, y - xOff, yOff == 0 ? 1 : yOff * 2, xOff == 0 ? 1 : xOff * 2);
      } else {
        ctx.beginPath();
        ctx.moveTo(x - yOff, y - xOff);
        ctx.lineTo(x + yOff, y + xOff);
        ctx.stroke();
      }
      //const x = Math.round(this.x - this.length * 0.5);
      //const y = Math.round(this.y - this.length * 0.5);
      //ctx.fillRect(x, y, this.length, this.length);
      //ctx.clearRect(x + 1, y + 1, this.length - 2, this.length - 2);
    }
  }
}

export { GridNode };
