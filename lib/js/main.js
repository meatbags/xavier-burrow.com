import './lib';
import { Master } from './render';
import { Chess, Piano } from './mini';

class App {
  constructor() {
    /*
    this.master = new Master(window.mobileCheck());
    window.onblur = () => { this.master.blur(); };
    window.onfocus = () => { this.master.focus(); };
    window.onresize = () => { this.master.resize(); };
    window.onmousemove = (e) => { this.master.handleMouse(e.clientX, e.clientY); };
    window.addEventListener('orientationchange', () => { this.master.resize(); });
    document.body.onscroll = () => {
      this.scroll = (new Date()).getTime();
      // check for scroll complete
      setTimeout(() => {
        if ((new Date()).getTime() - this.scroll >= 5) {
          this.master.reset();
        }
      }, 10);
    };
    */

    // mini apps
    this.chess = new Chess();
    this.piano = new Piano();
  }
}

window.onload = () => { var app = new App(); };
