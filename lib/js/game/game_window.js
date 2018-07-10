/**
 ** Doc window, resize/move events.
 **/

import { Window } from '../dom';

class GameWindow extends Window {
  constructor(scene, renderer) {
    // init
    const width = 400;
    const height = 240;
    const offset = 80;
    super('/usr/games/grid_ref.php', width, height, window.innerWidth - width - offset, offset);

    // renderer
    this.width = width;
    this.height = height;
    this.scene = scene;
    this.renderer = renderer.renderer;
    this.el.body.appendChild(this.renderer.domElement);

    // init doc events
    this.resize();
  }

  resize() {
    const rect = this.el.body.getBoundingClientRect();
    const w = rect.width || this.defaultWidth;
    const h = rect.height || this.defaultHeight;
    this.renderer.setSize(w, h);
    this.scene.resize(w, h);
  }
}

export { GameWindow };
