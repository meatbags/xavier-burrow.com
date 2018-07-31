/**
 * Automatic tweening.
 */

class TweenValue {
  constructor(parent, attr, target, time) {
    this.parent = parent;
    this.attr = attr;
    this.origin = parent[attr];
    this.target = target;
    this.age = 0;
    this.time = time;
  }

  update(delta) {
    this.age += delta;
    var t = Math.min(1.0, this.age / this.time);
    t = 1 - Math.pow(1 - t, 2);
    this.parent[this.attr] = this.origin + (this.target - this.origin) * t;
    this.complete = t >= 1;
  }

  isComplete() {
    return this.complete || false;
  }
}

export { TweenValue };
