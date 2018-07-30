/**
 * Init menus and scroll fx.
 */

class Menu {
  constructor() {
    // menu links
    this.menuLock = false;
    this.menu = document.querySelector('.menu-list');
    this.items = this.menu.querySelectorAll('.item');
    this.items.forEach(e => {
      e.onclick = () => {
        this.openMenu(e);
      };
    });

    // parallax
    this.body = document.querySelector('.sections');
    this.sections = document.querySelectorAll('.section-wrapper.active .section');
    this.body.onscroll = () => { this.parallax(); };
    this.parallax();
  }

  parallax() {
    // apply parallax effects
    if (this.sections.length) {
      const threshold = window.innerHeight * 0.6;
      const threshold2 = window.innerHeight * 0.9;
      const d = threshold2 - threshold;
      for (var i=0, len=this.sections.length; i<len; ++i) {
        const e = this.sections[i];
        const rect = e.getBoundingClientRect();
        if (rect.top <= threshold) {
          e.style.opacity = 1;
        } else if (rect.top <= threshold2) {
          e.style.opacity = 1 - ((rect.top - threshold) / d);
        } else {
          e.style.opacity = 0;
        }
      }
    }
  }

  openMenu(e) {
    if (!e.classList.contains('active') && !this.menuLock) {
      //this.menuLock = true;
      this.menu.querySelectorAll('.active').forEach(e => { e.classList.remove('active'); });
      e.classList.add('active');
      const target = e.dataset.target;
      document.querySelectorAll('.section-wrapper.active').forEach(e => { e.classList.remove('active'); });
      document.querySelector(target).classList.add('active');
      //setTimeout(() => { this.menuLock = false; }, 250);
      this.sections = document.querySelectorAll('.section-wrapper.active .section');
      this.parallax();
    }
  }
}

export { Menu }
