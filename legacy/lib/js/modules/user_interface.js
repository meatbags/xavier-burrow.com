/**
 ** Hook up site UI.
 **/

class UserInterface {
  constructor(isMobile, root) {
    this.isMobile = isMobile;
    this.root = root;
    this.siteTitle = 'Xavier Burrow';

    // get dom targets
    this.target = {};
    this.target.title = document.querySelector('.title-target');
    ['date', 'description', 'links', 'tech', 'image', 'video'].forEach(key => {
      this.target[key] = document.querySelector('.project-pane .' + key);
    });
    this.target.filters = document.querySelectorAll('.filters .item');
    this.target.clearFilters = this.target.filters[this.target.filters.length - 1];
    this.target.nav = document.querySelector('.nav');
    this.target.projectPane = document.querySelector('.project-pane');

    // set up
    this.init();
    this.loadVideos();
    this.removeLoadingScreen();
  }

  init() {
    // project open/ close events
    document.querySelectorAll('.project-pane-close').forEach(e => {
      e.addEventListener('click', () => {
        this.closeSection();
      });
    });
    document.querySelectorAll('.section').forEach(e => {
      e.addEventListener('click', evt => {
        this.openSection(evt.currentTarget);
      });
    });

    // 3d effects
    if (!this.isMobile) {
      document.querySelectorAll('.section').forEach(e => {
        const child = e.querySelector('.section__inner');
        this.make3d(e, child);
      });
    }

    // contact page
    document.querySelectorAll('.contact').forEach(e => {
      e.addEventListener('click', () => { this.openSection(document.querySelector('.section-contact')); });
    });

    // handle back button
    window.addEventListener('hashchange', evt => {
      if (window.location.hash === '' || window.location.hash === '#home') {
        this.closeSection();
      }
    });

    // filters
    this.target.filters.forEach(e => {
      e.onclick = () => {
        this.filter(e);
      }
    });
  }

  make3d(parent, child) {
    // add 3d hover effect to element
    parent.addEventListener('mousemove', evt => {
      const rect = evt.currentTarget.getBoundingClientRect();
      const x = ((evt.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((evt.clientY - rect.top) / rect.height) * 2 - 1;
      const rx = -y * 15;
      const ry = x * 15;
      const amt = Math.sqrt(x*x + y*y) * 15 + 'deg';
      child.style.transform = `scale(1.05, 1.05) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    parent.addEventListener('mouseout', evt => {
      child.style.transform = 'translate(0)';
    });
  }

  removeLoadingScreen() {
    this.animateTitleTo(this.siteTitle, 100);
    setTimeout(() => {
      document.querySelector('.nav-bar').classList.add('active');
      this.toggleNav(true);
      this.toggleSections(true);
    }, 350);
  }

  getTitleHTML(text, hidden) {
    let res = '';
    let classes = `letter${hidden ? ' hidden' : ''}`
    for (var i=0; i<text.length; ++i) {
      res += `<span class="${classes}">${text[i]}</span>`;
    }
    return res;
  }

  animateTitleTo(text, step) {
    // create cascade title animation
    let next = this.getTitleHTML(text, true);
    let current = this.target.title.querySelectorAll('.letter');
    if (current.length == 0) {
      this.target.title.innerHTML = this.getTitleHTML(this.target.title.innerHTML, false);
      current = this.target.title.querySelectorAll('.letter');
    }

    // animate out
    let index = 0;
    let len = current.length;
    for (var i=0; i<len; ++i) {
      const el = current[i];
      setTimeout(() => {
        el.classList.add('hidden');
      }, (len - 1 - (++index)) * step);
    }

    // swap text
    setTimeout(() => {
      this.target.title.innerHTML = next;

      // animate in
      let current = this.target.title.querySelectorAll('.letter');
      let index = 0;
      let len = current.length;
      for (var i=0; i<len; ++i) {
        const el = current[i];
        setTimeout(() => { el.classList.remove('hidden'); }, ++index * step);
      }
    }, len * step);
  }

  toggleNav(state) {
    const step = 80;
    const op = state ? 'remove' : 'add';
    const selector = state ? '.item.hidden, .label.hidden' : '.filters .item, .filters .label';
    let index = 0;

    // hide/ show home elements
    const items = this.target.nav.querySelectorAll(selector);
    items.forEach(e => {
      const ms = state ? (++index) * step : (items.length - 1 - (++index)) * step;
      setTimeout(() => {
        e.classList[op]('hidden');
      }, ms);
    });

    // hide/ show project elements
    if (state) {
      this.target.nav.querySelector('.project-nav').classList.remove('active');
    } else {
      setTimeout(() => {
        this.target.nav.querySelector('.project-nav').classList.add('active');
      }, index * step);
    }
  }

  toggleSections(state) {
    return new Promise((resolve, reject) => {
      const op = state ? 'remove' : 'add';
      const step = state ? 80 : 40;
      const sections = document.querySelectorAll('.section');
      let index = 0;

      // cascade fade in/ out
      sections.forEach(e => {
        setTimeout(() => {
          e.classList[op]('hidden');
        }, (++index) * step);
      });

      // toggle wrapper hide/ scroll
      if (state) {
        document.querySelector('.sections').classList.remove('hidden');
        resolve(0);
      } else {
        setTimeout(() => {
          document.querySelector('.sections').classList.add('hidden');
          resolve(0);
        }, sections.length * step);
      }
    });
  }

  toggleProjectPane(state) {
    return new Promise((resolve, reject) => {
      if (state) {
        this.target.projectPane.classList.add('active');

        // cascade in
        let index = 0;
        const step = 80;
        this.target.projectPane.querySelectorAll('.hidden').forEach(e => {
          const child = e;
          setTimeout(() => {
            child.classList.remove('hidden');
          }, (++index) * step);
        });

        resolve(0);
      } else {
        // cascade out
        const step = 80;
        const dur = 500;
        let index = 0;
        const children = this.target.projectPane.querySelector('.project-pane__inner').childNodes;
        children.forEach(e => {
          if (e.nodeType === 1) {
            setTimeout(() => {
              e.classList.add('hidden');
            }, ++index * step);
          }
        });

        // de-activate
        setTimeout(() => {
          this.target.projectPane.classList.remove('active');
          resolve(0);
        }, index * step + dur);
      }
    });
  }

  hookUpGallery() {
    const slides = this.target.image.querySelectorAll('.slider .slides .slide');
    const thumbs = this.target.image.querySelectorAll('.slider .thumbnails .thumb');
    slides.forEach(e => { e.classList.remove('active'); });
    for (var i=0, len=thumbs.length; i<len; ++i) {
      const e = thumbs[i];
      e.dataset.index = i;
      e.classList.remove('active');
      e.onmousedown = () => {
        const index = e.dataset.index;
        if (slides[index]) {
          this.target.image.querySelectorAll('.slide.active, .thumb.active').forEach(e => {
            e.classList.remove('active');
          });
          slides[index].classList.add('active');
          e.classList.add('active');
        }
      }
    }
    slides[0].classList.add('active');
    thumbs[0].classList.add('active');
  }

  openSection(e) {
    if (!this.lock) {
      this.lock = true;

      // reposition
      window.scroll({top: 0, left: 0, behavior: 'smooth'});

      // copy simple data
      ['date', 'description', 'links', 'tech', 'image', 'video'].forEach(key => {
        const res = e.querySelector('.' + key);
        this.target[key].innerHTML = res ? res.innerHTML : '';
      });

      // animate project page in
      const title = e.querySelector('.title').innerHTML;
      this.animateTitleTo(title, 50)
      setTimeout(() => {
        this.toggleSections(false).then(() => {
          this.toggleProjectPane(true);
          this.lock = false;
        });
        this.toggleNav(false);
      }, 350);

      if (window.location.hash == '#home' || window.location.hash == '') {
        window.location.hash = title;
      }

      // canvas animation
      if (this.isMobile) {
        this.root.overlay2D.scatter();
      }
    }
  }

  closeSection() {
    if (!this.lock) {
      this.lock = true;

      // revert to site title
      this.animateTitleTo(this.siteTitle, 50);
      setTimeout(() => {
        this.toggleNav(true);
      }, 350);

      // close pane, open sections
      this.toggleProjectPane(false).then(() => {
        this.toggleSections(true);
        this.lock = false;
      });

      // set hash
      window.location.hash = 'home';
    }
  }

  filter(e) {
    // filter projects on the home page
    const f = e.dataset.filter;
    if (f === 'clear') {
      this.target.filters.forEach(e => { e.classList.add('active'); });
      this.target.clearFilters.classList.add('dimmed');
      document.querySelectorAll('.section').forEach(e => { e.classList.remove('filtered'); });
    } else {
      this.target.filters.forEach(e => { e.classList.remove('active'); });
      e.classList.add('active');
      this.target.clearFilters.classList.add('active');
      this.target.clearFilters.classList.remove('dimmed');
      const filterClass = `filter-${f}`;
      document.querySelectorAll('.section').forEach(e => {
        if (e.classList.contains(filterClass)) {
          e.classList.remove('filtered');
        } else {
          e.classList.add('filtered');
        }
      });
    }
  }

  loadVideos() {
    document.querySelectorAll('.video').forEach(vid => {
      if (vid.dataset.src) {
        vid.innerHTML = vid.dataset.src;
      }
    });
  }
}

export { UserInterface };
