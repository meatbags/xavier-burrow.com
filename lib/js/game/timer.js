/**
 * Basic timekeeping.
 */

class Timer {
  constructor() {
    this.reset();
  }

  reset() {
    this.now = (new Date()).getTime();
    this.then = this.now;
  }

  update() {
    this.now = (new Date()).getTime();
    this.delta = (this.now - this.then) / 1000.0;
    this.then = this.now;
    return this.delta;
  }
}

export { Timer };
