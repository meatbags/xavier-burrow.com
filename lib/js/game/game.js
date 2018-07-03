/**
 * Typing game.
 */

import { GameWindow } from './game_window';
import { Renderer } from './renderer';
import { Scene } from './scene';
import { Timer } from './timer';

class Game {
  constructor() {
    this.scene = new Scene();
    this.renderer = new Renderer(this.scene);
    this.window = new GameWindow(this.scene, this.renderer);
    this.timer = new Timer();
    this.timer.reset();
    this.loop();
  }

  loop() {
    //requestAnimationFrame(() => { this.loop(); });
    const delta = this.timer.update();
    this.scene.update(delta);
    this.renderer.render();
  }
}

export { Game };