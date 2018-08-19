/**
 * Grid graphics node.
 */

const TYPE_LINE = 1;
const TYPE_DOT = 2;

class Node {
  constructor(x, y, length) {
    const poster = 4;
    const offset = Math.random() * 20;
    this.angle = Math.floor(Math.random() * poster) * (Math.PI / (poster / 2));
    this.x = x + Math.cos(this.angle) * offset;
    this.y = y + Math.sin(this.angle) * offset;
    this.vec = {
      x: Math.cos(this.angle) * length,
      y: Math.sin(this.angle) * length
    };
    this.length = 10 + length * 0.25 * Math.random();
    this.decay = 40;

    //posterise position
    this.x = Math.round(this.x / 8) * 8;
    this.y = Math.round(this.y / 8) * 8;

    // node type
    this.type = (Math.random() < 0.95) ? TYPE_LINE : TYPE_DOT;
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
    if (this.type === TYPE_LINE) {
      const x = (Math.cos(this.angle) * this.length / 2);
      const y = (Math.sin(this.angle) * this.length / 2);
      ctx.beginPath();
      ctx.moveTo(this.x - x, this.y - y);
      ctx.lineTo(this.x + x, this.y + y);
      ctx.stroke();
    } else {
      // == TYPE_DOT
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.length / 2, 0, Math.PI * 2, 1);
      ctx.stroke();
    }
  }
}

export { Node };
