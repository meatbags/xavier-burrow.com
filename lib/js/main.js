/**
 ** Initialise UI and canvas graphics.
 **/

import { mobileCheck } from './mobile_check';
import { UserInterface } from './user_interface';
import { Overlay2D } from './overlay2d';

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
