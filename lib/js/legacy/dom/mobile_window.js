/**
 * Mobile version of window.
 */

import { el } from './el';

class MobileWindow {
  constructor(label) {
    this.domElement = el('div', {classList: 'window mobile-window'});
    this.el = {
      header: el('div', {classList: 'window__header', innerHTML: label}),
      body: el('div', {classList: 'window__body'})
    };
    this.domElement.appendChild(this.el.header);
    this.domElement.appendChild(this.el.body);

    // doc
    this.events();

    // show
    document.querySelector('.wrapper').appendChild(this.domElement);
  }

  events() {
    // z-index/ ordering
    this.defaultIndex = 200 + document.querySelectorAll('.window').length;
    this.domElement.style.zIndex = this.defaultIndex;
  }
}

export { MobileWindow };
