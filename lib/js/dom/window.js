/**
 * An interactive window.
 */

import { el } from './el';
import { clamp } from '../maths';

class Window {
  constructor(label, width, height, x, y) {
    this.width = width;
    this.height = height;
    this.limit = {
      x: {min: 200, max: 960},
      y: {min: 100, max: 800}
    };
    this.domElement = el('div', {classList: 'window'});
    this.el = {
      header: el('div', {classList: 'window__header', innerHTML: label}),
      body: el('div', {classList: 'window__body'}),
      resize: el('div', {classList: 'window__body-resize', innerHTML: '&#x21d5;'})
    };
    this.el.body.appendChild(this.el.resize);
    this.domElement.appendChild(this.el.header);
    this.domElement.appendChild(this.el.body);
    this.el.body.style.width = `${this.width}px`;
    this.el.body.style.height = `${this.height}px`;
    this.domElement.style.left = `${x}px`;
    this.domElement.style.top = `${y}px`;

    // doc
    this.events();

    // show
    document.body.appendChild(this.domElement);
  }

  events() {
    // mouse-window interaction
    this.mouse = {
      position: {x: 0, y: 0},
      ref: {x: 0, y: 0},
      delta: {x: 0, y: 0},
      set: (e, rx, ry) => {
        this.mouse.position.x = e.clientX;
        this.mouse.position.y = e.clientY;
        this.mouse.ref.x = rx;
        this.mouse.ref.y = ry;
      },
      move: (e) => {
        this.mouse.delta.x = e.clientX - this.mouse.position.x;
        this.mouse.delta.y = e.clientY - this.mouse.position.y;
      },
      getRelative: () => {
        return {
          x: this.mouse.ref.x + this.mouse.delta.x,
          y: this.mouse.ref.y + this.mouse.delta.y
        };
      }
    };

    // z-index/ ordering
    this.defaultIndex = 200 + document.querySelectorAll('.window').length;
    this.domElement.style.zIndex = this.defaultIndex;
    this.domElement.onmousedown = () => {
      const current = parseInt(this.domElement.style.zIndex);
      var max = this.defaultIndex;
      document.querySelectorAll('.window').forEach(e => {
        max = Math.max(max, parseInt(e.style.zIndex));
      });
      if (current < max) {
        document.querySelectorAll('.window').forEach(e => {
          const index = parseInt(e.style.zIndex);
          if (index > current) {
            e.style.zIndex = index - 1;
          }
        });
        this.domElement.style.zIndex = max;
      }
    }

    // position and resize events
    this.el.header.onmousedown = (e) => {
      const rect = this.domElement.getBoundingClientRect();
      this.mouse.set(e, rect.left, rect.top + document.documentElement.scrollTop);
      this.el.header.active = true;
      this.el.header.classList.add('active');
    };
    this.el.resize.onmousedown = (e) => {
      const rect = this.el.body.getBoundingClientRect();
      this.mouse.set(e, rect.width, rect.height);
      this.el.resize.active = true;
      this.el.resize.classList.add('active');
    };
    document.addEventListener('mouseup', () => {
      if (this.el.header.active) {
        this.el.header.active = false;
        this.el.header.classList.remove('active');
      }
      if (this.el.resize.active) {
        this.el.resize.active = false;
        this.el.resize.classList.remove('active');
      }
    });
    document.addEventListener('mousemove', (e) => {
      if (this.el.header.active) {
        this.mouse.move(e);
        const p = this.mouse.getRelative();
        const rect = this.domElement.getBoundingClientRect();
        const tx = clamp(p.x, 0, window.innerWidth - rect.width);
        const ty = clamp(p.y, 0, document.documentElement.scrollHeight - rect.height);
        this.domElement.style.left = `${tx}px`;
        this.domElement.style.top = `${ty}px`;
      } else if (this.el.resize.active) {
        this.mouse.move(e);
        const p = this.mouse.getRelative();
        const w = clamp(p.x, this.limit.x.min, this.limit.x.max);
        const h = clamp(p.y, this.limit.y.min, this.limit.y.max);
        this.el.header.style.width = `${w}px`;
        this.el.body.style.width = `${w}px`;
        this.el.body.style.height = `${h}px`;
        if (this.resize) {
          this.resize();
        }
      }
    });
  }
}

export { Window };
