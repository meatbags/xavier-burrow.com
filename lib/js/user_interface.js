/**
 * Init menus and scroll fx.
 */

class UserInterface {
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

    // contact box
    this.contact = document.querySelector('.contact-box');
    this.contact.querySelector('.contact-box__header').onclick = () => {
      if (!this.contact.classList.contains('active')) {
        this.contact.classList.add('active');
        const email = this.contact.querySelector('.contact-box__contact .email');
        const rect = email.getBoundingClientRect();
        this.contact.querySelector('.contact-box__contact').style.height = rect.height + 'px';
        email.classList.add('active');
      }
    };

    // parallax
    this.body = document.querySelector('.sections');
    this.sections = document.querySelectorAll('.section-wrapper.active .section');
    this.body.onscroll = () => { this.parallax(); };
    this.parallax();

    // fade in
    this.removeLoadingScreen();
    setTimeout(() => { this.body.classList.add('active') }, 500);
  }

  parallax() {
    // apply parallax effects
    if (this.sections.length) {
      const threshold = window.innerHeight * 0.65;
      const threshold2 = window.innerHeight * 1.0;
      const d = threshold2 - threshold;
      for (var i=0, len=this.sections.length; i<len; ++i) {
        const e = this.sections[i];
        const rect = e.getBoundingClientRect();
        const y = rect.top + rect.height / 2;
        const alpha = y <= threshold ? 1 : y <= threshold2 ? 1 - ((y - threshold) / d) : 0;
        e.style.opacity = alpha;
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

  removeLoadingScreen() {
    const e = document.querySelector('.loading-screen');
    e.style.opacity = 0;
    setTimeout(() => { e.remove(); }, 1000);
  }
}

export { UserInterface }
