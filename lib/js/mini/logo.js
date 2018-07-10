import { Window } from '../dom';

class Logo {
  constructor() {
    this.window = new Window('undefined', 200, 100, window.innerWidth / 2 - 200, 420);
    this.domElement = document.querySelector('#logo-target');
    this.window.el.body.appendChild(this.domElement);
    this.window.domElement.classList.add('transparent');
    this.domElement.classList.remove('display-none');
  }
}

export { Logo };
