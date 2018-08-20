/**
 * Set up UI.
 */

import { mobileCheck } from './mobile_check';
import { UserInterface } from './user_interface';
import { Overlay2D } from './overlay2d';

class App {
  constructor() {
    const isMobile = mobileCheck();
    this.ui = new UserInterface();
    this.overlay2D = new Overlay2D();
  }
}

window.onload = () => { var app = new App(); };
