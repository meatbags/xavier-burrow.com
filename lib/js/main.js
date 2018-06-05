import './lib';
import { Master } from './render';
import { Chess, Piano } from './mini';

class App {
  constructor() {
    this.master = new Master(window.mobileCheck());

    // events
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

    // nav
    this.target = {
      menu: document.querySelector('#section-menu'),
      projects: document.querySelector('#section-projects')
    }
    document.querySelectorAll('#to-menu, .to-back').forEach(e => {
      e.onclick = () => {
        this.open(this.target.menu);
      };
    });
    document.querySelector('#to-projects').onclick = () => {
      this.open(this.target.projects);
    };

    // mini apps
    this.chess = new Chess();
    this.piano = new Piano();

    // run
    this.master.run();
  }

  open(section) {
    // go to section & trigger app update
    document.querySelectorAll('.section, .section .box').forEach(e => { e.classList.remove('active'); });
    section.classList.add('active');
    section.querySelectorAll('.box').forEach(e => { e.classList.add('active'); });

    // set app state
    this.master.reset();
  }
}

window.onload = () => { const app = new App(); };
