import './lib/mobile_check.js';
import './lib/post_processing';
import Master from './modules/master';

class App {
  constructor() {
    // handle DOM input and init app

    this.isMobile = window.mobileCheck();

    // app

    this.master = new Master(this.isMobile);

    // events

    window.onblur = () => { this.master.blur(); };
    window.onfocus = () => { this.master.focus(); };
    window.onresize = () => { this.master.resize(); };
    window.onmousedown = (e) => { this.master.handleMouse(e.clientX, e.clientY); };
    window.addEventListener('orientationchange', () => { this.master.resize(); });

    // run

    this.master.run();
  }
}

window.onload = () => { const app = new App(); };
