/**
 * Load mini-apps.
 */

import { Projects } from './projects';
import { Game } from './game';
import { Chess, Piano, BusinessCard, Logo, Graphic } from './mini';
import { mobileCheck } from './utils';
import { Menu } from './menu';

class App {
  constructor() {
    const isMobile = mobileCheck();
    this.menu = new Menu();
    //this.graphic = new Graphic();
    this.game = new Game();

    if (!isMobile) {
      //this.card = new BusinessCard();
      //this.piano = new Piano();
      //this.logo = new Logo();
      //this.chess = new Chess();
      //this.projects = new Projects();
    }
  }
}

window.onload = () => { var app = new App(); };
