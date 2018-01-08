class Circle {
  constructor(position, radius) {
    // circular collision object

    this.position = position;
    this.radius = radius;
  }

  update() {
    
  }

  collision(point) {
    // get collision

    return (point.distanceTo(this.position) < this.radius);
  }
}

export default Circle;
