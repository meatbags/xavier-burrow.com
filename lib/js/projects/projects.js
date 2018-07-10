/**
 * Organise the project sections.
 **/

import { Window, MobileWindow } from '../dom';

class Projects {
  constructor(isMobile) {
    const h = window.innerHeight - 100;
    if (isMobile) {
      this.window = new MobileWindow('~/portfolio');
      document.querySelectorAll('.section-gallery').forEach(e => { e.classList.add('display-none'); });
    } else {
      this.window = new Window('~/portfolio', 600, h, 100, 30);
    }
    this.domElement = document.querySelector('#sections-target');
    this.window.el.body.appendChild(this.domElement);
    this.domElement.classList.remove('display-none');
    this.events();
  }

  events() {
    document.querySelectorAll('.section-header').forEach(e => {
      e.onclick = () => {
        e.parentNode.parentNode.classList.toggle('active');
      }
    });
    this.currentImage = document.querySelector('#sections-current-image');
    document.querySelectorAll('.gallery-image').forEach(el => {
      const im = el.querySelector('.full');
      el.onmouseenter = (e) => {
        const rect = el.getBoundingClientRect();
        this.currentImage.style.left = rect.left + 'px';
        this.currentImage.style.top = rect.top + 'px';
        this.currentImage.appendChild(im);
      }
      el.onmouseleave = (e) => {
        el.appendChild(im);
      }
    });
  }
}

export { Projects };
