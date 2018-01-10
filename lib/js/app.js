import './lib/mobile_check.js';
import './lib/post_processing';
import Master from './modules/master';

class App {
  constructor() {
    // handle DOM input and init app

    this.isMobile = window.mobileCheck();

    // app

    this.master = new Master(this.isMobile);

    // app events

    window.onblur = () => { this.master.blur(); };
    window.onfocus = () => { this.master.focus(); };
    window.onresize = () => { this.master.resize(); };
    window.onmousemove = (e) => { this.master.handleMouse(e.clientX, e.clientY); };
    window.addEventListener('orientationchange', () => { this.master.resize(); });

    // navigation

    this._navigation();

    // run

    this.master.run();
  }

  _navigation() {
    // set up navigation

    $('#to-menu, #to-back').on('click', () => { this._open($('#section-menu')); });
    $('#to-projects').on('click', () => { this._open($('#section-projects')); });
  }

  _open(section) {
    // go to section & trigger app update

    $('.section, .section .box').removeClass('active');
    section.addClass('active');
    section.find('.box').addClass('active');

    // set app state

    this.master.reset();
  }
}

window.onload = () => { const app = new App(); };
