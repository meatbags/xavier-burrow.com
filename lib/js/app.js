import './lib/mobile_check.js';
import './lib/post_processing';
import Master from './modules/master';

class App {
  constructor() {
    this.master = new Master(window.mobileCheck());

    // events

    window.onblur = () => { this.master.blur(); };
    window.onfocus = () => { this.master.focus(); };

    // run

    this.master.run();
  }
}

window.onload = () => {
  const app = new App();
};
