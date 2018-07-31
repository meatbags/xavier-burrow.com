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
    this.contact.onclick = () => {
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

    // sections
    this.backgroundImage = document.querySelector('.background-image');
    this.backgroundFill = document.querySelector('.background-fill');
    this.selectedImage = document.querySelector('.background-selected-image');
    document.querySelectorAll('.section').forEach(e => {
      e.onclick = () => { this.openSection(e); };
    });

    // fade in
    this.removeLoadingScreen();
    setTimeout(() => {
      this.backgroundImage.classList.remove('dimmed');
      document.querySelector('.menu').style.opacity = 1;
      document.querySelector('.contact-box').style.opacity = 1;
      this.body.classList.add('active');
    }, 500);
  }

  parallax(cascade) {
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
        if (!cascade) {
          e.style.opacity = alpha;
        } else {
          setTimeout(() => { e.style.opacity = alpha; }, 100 * i);
        }
      }
    }
  }

  closeCurrentSection() {
    document.querySelectorAll('.section.active').forEach(e => {
      e.classList.remove('active');
      const vid = e.querySelector('.section-video');
      if (vid) {
        vid.querySelectorAll('iframe').forEach(v => {
          v.src = v.src;
        });
      }
    });
    this.backgroundFill.classList.remove('dimmed');
    this.backgroundImage.classList.remove('dimmed');
  }

  emptyImagePanes() {
    // fade out and remove images from both panes
    var required = false;
    this.selectedImage.querySelectorAll('.pane').forEach(el => {
      el.classList.remove('active');
      if (el.firstChild) {
        required = true;
        el.firstChild.classList.add('rm');
      }
    });

    // cancel other fades
    if (this.currentFadeTimeout) {
      clearTimeout(this.currentFadeTimeout);
    }

    // fade
    if (required) {
      setTimeout(() => {
        this.selectedImage.querySelectorAll('.rm').forEach(e => {
          e.classList.remove('rm');
          document.querySelector(e.dataset.target).appendChild(e);
        });
      }, 1000);
    }
  }

  openSection(e) {
    if (!e.classList.contains('active')) {
      this.closeCurrentSection();
      e.classList.add('active');
      const img = e.querySelector('.section-image');

      if (img) {
        // fade to other image pane
        var pane, previous;
        previous = this.selectedImage.querySelector('.pane.active');
        if (!previous) {
          const children = this.selectedImage.querySelectorAll('.pane');
          pane = children[0];
          previous = children[1];
        } else {
          pane = this.selectedImage.querySelector('.pane:not(.active)');
        }

        // cancel fades
        if (this.currentFadeTimeout) {
          clearTimeout(this.currentFadeTimeout);
        }
        this.selectedImage.querySelectorAll('.rm').forEach(el => { el.classList.remove('rm'); });

        // mark old images for removal, prepend new
        pane.childNodes.forEach(el => { el.classList.add('rm'); });
        previous.childNodes.forEach(el => { el.classList.add('rm'); });
        const targetImage = document.querySelector(img.dataset.target);
        targetImage.classList.remove('rm');
        pane.prepend(targetImage);

        // prune marked images
        this.currentFadeTimeout = setTimeout(() => {
          this.selectedImage.querySelectorAll('.rm').forEach(e => {
            e.classList.remove('rm');
            document.querySelector(e.dataset.target).appendChild(e);
          });
        }, 1000);

        // fade
        pane.classList.add('active');
        previous.classList.remove('active');
        this.backgroundFill.classList.add('dimmed');
        this.backgroundImage.classList.add('dimmed');
      } else {
        this.emptyImagePanes();
      }
    }
  }

  openMenu(e) {
    if (!e.classList.contains('active') && !this.menuLock) {
      this.closeCurrentSection();
      this.emptyImagePanes();
      this.menu.querySelectorAll('.active').forEach(e => { e.classList.remove('active'); });
      e.classList.add('active');
      const target = e.dataset.target;
      document.querySelectorAll('.section-wrapper.active').forEach(e => { e.classList.remove('active'); });
      document.querySelector(target).classList.add('active');
      this.sections = document.querySelectorAll('.section-wrapper.active .section');
      this.parallax();
    } else {
      this.closeCurrentSection();
      this.emptyImagePanes();
    }
  }

  removeLoadingScreen() {
    const e = document.querySelector('.loading-screen');
    e.style.opacity = 0;
    setTimeout(() => { e.remove(); }, 1000);
  }
}

export { UserInterface }
