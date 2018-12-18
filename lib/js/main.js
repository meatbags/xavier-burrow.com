/**
 ** Initialise UI and canvas graphics.
 **/

import { mobileCheck } from './utils';
import { UserInterface, Overlay2D } from './modules';

class App {
  constructor() {
    const isMobile = mobileCheck();
    this.overlay2D = new Overlay2D(isMobile);
    this.ui = new UserInterface(isMobile, this);
  }
}

window.onload = () => {
  var app = new App();
};
