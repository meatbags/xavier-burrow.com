/**
 * App entry point. Hook everything up.
 */

import { Projects } from './projects';
import { Game } from './game';
import { Chess, Piano, BusinessCard, Logo } from './mini';

class App {
  constructor() {
    this.card = new BusinessCard();
    this.game = new Game();
    this.piano = new Piano();
    this.chess = new Chess();
    this.logo = new Logo();
    this.projects = new Projects();
  }
}

window.onload = () => { var app = new App(); };
