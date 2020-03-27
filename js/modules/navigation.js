/** Navigation */

class Navigation {
  constructor() {}

  bind(root) {
    this.ref = {};

    // events
    document.querySelectorAll('[data-target]').forEach(el => {
      el.addEventListener('click', () => {
        this.toggle(el.dataset.target);
      });
    });
    document.querySelectorAll('[data-close]').forEach(el => {
      el.addEventListener('click', () => {
        this.close(el.dataset.close);
      });
    })
  }

  toggle(selector) {
    const target = document.querySelector(selector);
    if (target) {
      target.classList.toggle('active');
    } else {
      console.log('[Navigation] could not find element:', selector);
    }
  }

  close(selector) {
    const target = document.querySelector(selector);
    if (target) {
      target.classList.remove('active');
    } else {
      console.log('[Navigation] could not find element:', selector);
    }
  }
}

export default Navigation;
