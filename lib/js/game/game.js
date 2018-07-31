/**
 * Three main loop. Init scene, renderer, timer.
 */

import { Renderer } from './renderer';
import { Scene } from './scene';
import { Timer } from './timer';

class Game {
  constructor() {
    this.scene = new Scene(() => { this.onload(); });
    this.renderer = new Renderer(this.scene);
    document.body.appendChild(this.renderer.getElement());
    this.timer = new Timer();
    this.timer.reset();
    this.loop();
  }

  onload() {
    this.renderer.getElement().classList.add('active');
  }

  loop() {
    requestAnimationFrame(() => { this.loop(); });
    const delta = this.timer.update();
    this.scene.update(delta);
    this.renderer.render();
  }
}

export { Game };
