/**
 * Load mini-apps and set up UI.
 */

import { Overlay } from './overlay';
//import { Chess, Piano, BusinessCard, Logo } from './app';
import { mobileCheck } from './mobile_check';
import { UserInterface } from './user_interface';
import { Overlay2D } from './overlay2d';

class App {
  constructor() {
    const isMobile = mobileCheck();
    this.ui = new UserInterface();
    //this.overlay = new Overlay();
    //this.overlay2D = new Overlay2D();

    /*
    //this.menu = new UserInterface();
    if (isMobile) {
      document.querySelectorAll('.mobile-remove').forEach(e => { e.remove(); });
    } else {
      //this.overlay = new Overlay();
      this.card = new BusinessCard();
      this.piano = new Piano();
      this.logo = new Logo();
      this.chess = new Chess();
    }
    */
  }
}

window.onload = () => { var app = new App(); };
