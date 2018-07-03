/**
 ** Doc window, resize/move events.
 **/

import { el } from '../dom';
import { clamp } from '../maths';

class GameWindow {
  constructor(scene, renderer) {
    this.defaultWidth = 480;
    this.defaultHeight = 280;
    this.scene = scene;
    this.renderer = renderer.renderer;
    this.domElement = el('div', {classList: 'game-window'});
    this.el = {
      header: el('div', {classList: 'game-window__header', innerHTML: 'root@localhost:/var/www/game.php'}),
      body: el('div', {classList: 'game-window__body'}),
      resize: el('div', {classList: 'game-window__body-resize', innerHTML: '&#x21d5;'})
    }
    this.el.body.appendChild(this.el.resize);
    this.domElement.appendChild(this.el.header);
    this.domElement.appendChild(this.el.body);
    this.el.body.style.width = `${this.defaultWidth}px`;
    this.el.body.style.height = `${this.defaultHeight}px`;
    this.el.body.appendChild(this.renderer.domElement);
    document.body.appendChild(this.domElement);

    // init doc events
    this.events();
    this.resize();
  }

  resize() {
    const rect = this.el.body.getBoundingClientRect();
    const w = rect.width || this.defaultWidth;
    const h = rect.height || this.defaultHeight;
    this.renderer.setSize(w, h);
    this.scene.resize(w, h);
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
    this.el.header.onmousedown = (e) => {
      const rect = this.domElement.getBoundingClientRect();
      this.mouse.set(e, rect.left, rect.top);
      this.el.header.active = true;
      this.el.header.classList.add('active');
    };
    this.el.resize.onmousedown = (e) => {
      const rect = this.el.body.getBoundingClientRect();
      this.mouse.set(e, rect.width, rect.height);
      this.el.resize.active = true;
      this.el.resize.classList.add('active');

      // align top-left
      const base = this.domElement.getBoundingClientRect();
      this.domElement.style.left = `${base.left}px`;
      this.domElement.style.top = `${base.top}px`;
      this.domElement.style.right = 'auto';
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
        const ty = clamp(p.y, 0, window.innerHeight - rect.height);
        this.domElement.style.left = `${tx}px`;
        this.domElement.style.top = `${ty}px`;
        this.domElement.style.right = 'auto';
      } else if (this.el.resize.active) {
        this.mouse.move(e);
        const p = this.mouse.getRelative();
        const w = clamp(p.x, 200, 960);
        const h = clamp(p.y, 100, 540);
        this.el.header.style.width = `${w}px`;
        this.el.body.style.width = `${w}px`;
        this.el.body.style.height = `${h}px`;
        this.resize();
      }
    });
  }
}

export { GameWindow };
