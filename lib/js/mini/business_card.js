/**
 * Interactive business card.
 */

import { Window, el } from '../dom';

class BusinessCard {
  constructor() {
    const x = window.innerWidth - 400 - 600;
    const y = 100;
    this.window = new Window('~/business_card', 440, 320, x, y);
    this.window.domElement.classList.add('alt');
    this.domElement = document.querySelector('#business-card .bc-wrapper');
    this.window.el.body.appendChild(this.domElement);

    // hover effects
    this.parent = this.domElement.querySelector('.bc-parent');
    this.child = this.domElement.querySelector('.bc');
    this.parent.onmousemove = (e) => {
      const rect = this.parent.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      const rx = -y * 15;
      const ry = x * 15;
      const amt = Math.sqrt(x*x + y*y) * 15 + 'deg';
      this.child.style.transform = `scale(1.1, 1.1) rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    this.parent.onmouseout = () => {
      // strip scale
      const str = this.child.style.transform;
      this.child.style.transform = str.substr(str.search('rotate'), str.length);
    };

    // swap side
    this.domElement.querySelector('.bc-switch').onclick = () => {
      this.child.classList.toggle('active');
    };
  }
}

export { BusinessCard };
