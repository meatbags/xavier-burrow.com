class Timer {
  constructor() {
    this.now = (new Date()).getTime();
    this.then = this.now;
    this.delta = 0;
  }

  update() {
    this.now = (new Date()).getTime();
    this.delta = (this.now - this.then) / 1000.0;
    this.then = this.now;
    return this.delta;
  }
}

export { Timer };
