import './lib';
import { Grid3D } from './3d_grid';
import { Grid2D } from './2d_grid';
import { Chess, Piano } from './mini';
import { Timer } from './util';

class App {
  constructor() {
    this.grid3d = new Grid3D();
    this.grid2d = new Grid2D();

    // mini apps
    this.chess = new Chess();
    this.piano = new Piano();

    // run
    this.timer = new Timer();
    this.events();
    this.loop();
  }

  events() {
    window.onresize = () => {
      this.grid3d.resize();
      this.grid2d.resize();
    };
    window.onmousemove = (e) => {
      this.grid2d.handleMouse(e.clientX, e.clientY);
      this.grid3d.handleMouse(e.clientX, e.clientY);
    };
    window.addEventListener('orientationchange', () => { this.grid3d.resize(); });
    window.onscroll = () => {
      this.grid2d.onscroll();
    };
  }

  loop() {
    requestAnimationFrame(() => { this.loop(); });
    var delta = this.timer.update();
    this.grid3d.update(delta);
    this.grid2d.update(delta);
  }
}

window.onload = () => { var app = new App(); };
