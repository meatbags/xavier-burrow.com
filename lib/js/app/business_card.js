/**
 * Interactive business card.
 */

import { Window, el } from '../dom';

class BusinessCard {
  constructor() {
    const x = window.innerWidth / 2 - 100;
    const y = 140;
    this.window = new Window('~/business_card', 330, 220, x, y);
    this.window.domElement.classList.add('alt');
    this.domElement = document.querySelector('#business-card-target');
    this.window.el.body.appendChild(this.domElement);
    this.domElement.classList.remove('display-none');

    // swap side
    this.flipped = false;
    this.domElement.querySelector('.bc-switch').onclick = (e) => {
      if (!this.flipLock) {
        // flip card, changing html halfway
        this.flipLock = true;
        this.flipped = this.flipped == false;
        this.parent.classList.toggle('flip');
        this.transform(e);
        setTimeout(() => {
          this.child.classList.toggle('active');
        }, 150);
        setTimeout(() => {
          this.flipLock = false;
        }, 400);
      }
    };

    // hover effects
    this.parent = this.domElement.querySelector('.bc-parent');
    this.child = this.domElement.querySelector('.bc');
    this.transform = (e) => {
      const rect = this.parent.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      const rx = -y * 15;
      const ry = x * 15;
      this.child.style.transform = `scale(1.05, 1.05) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(0deg)`;
    };
    this.parent.onmousemove = (e) => {
      if (!this.flipLock) {
        this.transform(e);
      }
    };
    this.parent.onmouseout = () => {
      // strip scale
      const str = this.child.style.transform;
      this.child.style.transform = str.substr(str.search('rotate'), str.length);
    };
  }
}

export { BusinessCard };
