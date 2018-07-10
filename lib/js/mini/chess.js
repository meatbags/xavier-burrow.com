/**
 * Playable chess board.
 */

import { Window } from '../dom';

class Chess {
  constructor() {
    this.domElement = document.querySelector('#chess-target');
    this.window = new Window('~/glucksberg-najdorf-1929.pgn', 400, 360, window.innerWidth / 2 - 140, 760, 'opaque');
    this.window.el.body.appendChild(this.domElement);
    this.domElement.classList.remove('display-none');

    // set up board
    this.root = document.querySelector('.chess');
    this.board = document.querySelector('.chess-board ul');
    this.boardReset = document.querySelector('.chess-reset-board ul');
    document.querySelectorAll('.chess-reset').forEach(e => {
      e.onclick = () => {
        this.reset();
      }
    });
    this.setEvents();
  }

  onClick(e) {
    const active = this.root.querySelector('li.active');
    if (active) {
      e.currentTarget.innerHTML = active.innerHTML;
      active.classList.remove('active');
      active.innerHTML = '';
    } else {
      e.currentTarget.classList.add('active');
    }
  }

  setEvents() {
    document.querySelectorAll('.chess li').forEach(e => {
      e.onclick = (e) => { this.onClick(e); };
    });
  }

  reset() {
    // reset the chess board
    this.board.innerHTML = this.boardReset.innerHTML;
    this.setEvents();
  }
}

export { Chess };
