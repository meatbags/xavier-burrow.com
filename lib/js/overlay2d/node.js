/**
 * Grid graphics node.
 */

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = Math.random() * Math.PI;
    this.length = 1 + Math.random() * 100;
  }

  update(delta) {
    
  }

  draw(ctx) {
    const x = (Math.cos(this.angle) * this.length);
    const y = (Math.sin(this.angle) * this.length);
    ctx.beginPath();
    ctx.moveTo(this.x - x, this.y - y);
    ctx.lineTo(this.x + x, this.y + y);
    ctx.stroke();
  }
}

export { Node };
