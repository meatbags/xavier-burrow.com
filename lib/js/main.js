/**
 * App entry point. Hook everything up.
 */

import { Game } from './game';
import { Chess, Piano, BusinessCard } from './mini';

class App {
  constructor() {
    this.card = new BusinessCard();
    this.game = new Game();
    this.chess = new Chess();
    this.piano = new Piano();
  }
}

window.onload = () => { var app = new App(); };
