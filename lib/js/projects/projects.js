/**
 * Organise the project sections.
 **/

import { Window } from '../dom';

class Projects {
  constructor() {
    this.window = new Window('~/portfolio', 400, 600, 100, 30);
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
    })
  }
}

export { Projects };
