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
        e.addEventListener('mousemove', evt => {
          const child = evt.currentTarget.querySelector('.section__inner');
          const rect = evt.currentTarget.getBoundingClientRect();
          const x = ((evt.clientX - rect.left) / rect.width) * 2 - 1;
          const y = ((evt.clientY - rect.top) / rect.height) * 2 - 1;
          const rx = -y * 15;
          const ry = x * 15;
          const amt = Math.sqrt(x*x + y*y) * 15 + 'deg';
          child.style.transform = `scale(1.05, 1.05) rotateX(${rx}deg) rotateY(${ry}deg)`;
        });
        e.addEventListener('mouseout', evt => {
          const child = evt.currentTarget.querySelector('.section__inner');
          child.style.transform = 'translate(0)';
        });
      });
    }

    // contact page
    document.querySelectorAll('.contact').forEach(e => {
      e.addEventListener('click', () => { this.openSection(document.querySelector('.section-contact')); });
    });

    // handle back button
    window.addEventListener('hashchange', evt => {
      if ((window.location.hash === '' || window.location.hash === '#home') && document.querySelector('.wrapper').classList.contains('hidden')) {
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

  removeLoadingScreen() {
    this.animateTitleTo(this.siteTitle, 100).then(() => {
      document.querySelector('.nav-bar').classList.add('active');
      this.toggleNav(true);
      this.toggleSections(true);
    });
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
    return new Promise((resolve, reject) => {
      let next = this.getTitleHTML(text, true);
      let current = this.target.title.querySelectorAll('.letter');
      if (current.length == 0) {
        this.target.title.innerHTML = this.getTitleHTML(this.target.title.innerHTML, false);
        current = this.target.title.querySelectorAll('.letter');
      }

      // animate out
      let index = 0;
      let len = current.length;
      for (var i=len-1; i>-1; --i) {
        const el = current[i];
        setTimeout(() => { el.classList.add('hidden'); }, (++index) * step);
      }

      // swap
      setTimeout(() => {
        this.target.title.innerHTML = next;

        // animate in
        let current = this.target.title.querySelectorAll('.letter');
        let index = 0;
        let len = current.length;
        for (var i=0; i<len; ++i) {
          const el = current[i];
          setTimeout(() => { el.classList.remove('hidden'); }, (++index) * step);
        }
      }, (index) * step);

      setTimeout(() => { resolve(0); }, 350);
    });
  }

  toggleNav(state) {
    const step = 80;
    const op = state ? 'remove' : 'add';
    const selector = state ? '.hidden' : '.filters .item, .filters .label';
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
      const step = 80;
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

    });
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

      // change page title
      const title = e.querySelector('.title').innerHTML;
      this.animateTitleTo(title, 50).then(() => {
        this.toggleSections(false);
        this.toggleNav(false);
        this.lock = false;
      });
      if (window.location.hash == '#home' || window.location.hash == '') {
        window.location.hash = title;
      }

      // activate
      document.querySelector('.wrapper').classList.add('hidden');
      document.querySelector('.project-pane').classList.add('active');

      // canvas animation
      if (this.isMobile) {
        this.root.overlay2D.scatter();
      }
    }
  };

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

  closeSection() {
    if (!this.lock) {
      this.lock = true;
      this.animateTitleTo(this.siteTitle, 50).then(() => {
        this.toggleSections(true);
        this.toggleNav(true);
        this.lock = false;
      });

      document.querySelector('.wrapper').classList.remove('hidden');
      document.querySelector('.project-pane').classList.remove('active');

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
