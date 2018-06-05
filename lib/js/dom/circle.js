class Circle {
  constructor(position, radius) {
    this.position = position;
    this.radius = radius;
  }

  update() {}

  collision(point) {
    return (point.distanceTo(this.position) < this.radius);
  }
}

export { Circle };
