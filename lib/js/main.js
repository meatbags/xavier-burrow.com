/**
 * App entry point. Hook everything up.
 */

import { Projects } from './projects';
import { Game } from './game';
import { Chess, Piano, BusinessCard, Logo, Graphic } from './mini';
import { mobileCheck } from './utils';

class App {
  constructor() {
    const isMobile = mobileCheck();
    this.graphic = new Graphic();
    /*
    if (!isMobile) {
      this.card = new BusinessCard();
      this.game = new Game();
      this.piano = new Piano();
      this.logo = new Logo();
      this.chess = new Chess();
      this.projects = new Projects();
    } else {
      this.projects = new Projects(true);
      this.card = new BusinessCard(true);
    }
    */
  }
}

window.onload = () => { var app = new App(); };
