/**
 * App entry point. Hook everything up.
 */

import { Game } from './game';
import { Chess, Piano, BusinessCard } from './mini';

class App {
  constructor() {
    this.game = new Game();
    this.card = new BusinessCard();
    this.piano = new Piano();
    this.chess = new Chess();
    this.initSections();
  }

  initSections() {
    document.querySelectorAll('.section-header').forEach(e => {
      e.onclick = () => {
        e.parentNode.parentNode.classList.toggle('active');
      }
    })
  }
}

window.onload = () => { var app = new App(); };
