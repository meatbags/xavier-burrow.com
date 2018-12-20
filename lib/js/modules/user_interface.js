class UserInterface {
  constructor(isMobile, root) {
    this.isMobile = isMobile;
    this.root = root;
    this.siteTitle = 'Xavier Burrow';
    this.initSections();
    this.initFilters();
    this.loadVideos();
    this.removeLoadingScreen();
  }

  removeLoadingScreen() {
    this.animateTitleTo(this.siteTitle, 100).then(() => {
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
    if (!this.titleTarget) {
      this.titleTarget = document.querySelector('.title-target');
    }

    // create cascade title animation
    return new Promise((resolve, reject) => {
      let next = this.getTitleHTML(text, true);
      let current = this.titleTarget.querySelectorAll('.letter');
      if (current.length == 0) {
        this.titleTarget.innerHTML = this.getTitleHTML(this.titleTarget.innerHTML, false);
        current = this.titleTarget.querySelectorAll('.letter');
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
        this.titleTarget.innerHTML = next;

        // animate in
        let current = this.titleTarget.querySelectorAll('.letter');
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

  openSection(e) {
    if (!this.lock) {
      this.lock = true;

      // reposition
      window.scroll({top: 0, left: 0, behavior: 'smooth'});

      // change page title
      const title = e.querySelector('.title').innerHTML;
      this.animateTitleTo(title, 50).then(() => {
        this.toggleSections(false);
        this.lock = false;
      });
      if (window.location.hash == '#home' || window.location.hash == '') {
        window.location.hash = title;
      }

      // data
      //this.pane.title.innerHTML = e.querySelector('.title').innerHTML;
      this.pane.date.innerHTML = e.querySelector('.date').innerHTML;
      this.pane.description.innerHTML = e.querySelector('.description').innerHTML;

      // media
      const images = e.querySelector('.image').innerHTML;
      const video = e.querySelector('.video').innerHTML;
      this.pane.video.innerHTML = video ? video : '';

      // hook up gallery
      if (images.trim() != '') {
        this.pane.image.innerHTML = images;
        const slides = this.pane.image.querySelectorAll('.slider .slides .slide');
        const thumbs = this.pane.image.querySelectorAll('.slider .thumbnails .thumb');
        slides.forEach(e => { e.classList.remove('active'); });
        for (var i=0, len=thumbs.length; i<len; ++i) {
          const e = thumbs[i];
          e.dataset.index = i;
          e.classList.remove('active');
          e.onmousedown = () => {
            const index = e.dataset.index;
            if (slides[index]) {
              this.pane.image.querySelectorAll('.slide.active, .thumb.active').forEach(e => { e.classList.remove('active'); });
              slides[index].classList.add('active');
              e.classList.add('active');
            }
          }
        }
        slides[0].classList.add('active');
        thumbs[0].classList.add('active');
      } else {
        this.pane.image.innerHTML = '';
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

  closeSection() {
    if (!this.lock) {
      this.lock = true;
      this.animateTitleTo(this.siteTitle, 50).then(() => {
        this.toggleSections(true);
        this.lock = false;
      });

      document.querySelector('.wrapper').classList.remove('hidden');
      document.querySelector('.project-pane').classList.remove('active');

      // set hash
      window.location.hash = 'home';
    }
  }

  initSections() {
    // project pane reference
    this.pane = {
      //title: document.querySelector('.project-pane .title'),
      date: document.querySelector('.project-pane .date'),
      description: document.querySelector('.project-pane .description'),
      image: document.querySelector('.project-pane .image'),
      video: document.querySelector('.project-pane .video'),
      links: document.querySelector('.project-pane .links')
    };

    // project open/ close events
    document.querySelectorAll('.project-pane-close').forEach(e => {
      e.addEventListener('click', () => { this.closeSection(); });
    });
    document.querySelectorAll('.section').forEach(e => {
      e.addEventListener('click', evt => { this.openSection(evt.currentTarget); });
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
  }

  initFilters() {
    const filters = document.querySelectorAll('.filters .item');
    const clear = filters[filters.length - 1];
    const filter = (e) => {
      const f = e.dataset.filter;
      if (f === 'clear') {
        filters.forEach(e => { e.classList.add('active'); });
        clear.classList.add('dimmed');
        document.querySelectorAll('.section').forEach(e => { e.classList.remove('filtered'); });
      } else {
        filters.forEach(e => { e.classList.remove('active'); });
        e.classList.add('active');
        clear.classList.add('active');
        clear.classList.remove('dimmed');
        const filterClass = `filter-${f}`;
        document.querySelectorAll('.section').forEach(e => {
          if (e.classList.contains(filterClass)) {
            e.classList.remove('filtered');
          } else {
            e.classList.add('filtered');
          }
        });
      }
    };
    filters.forEach(e => {
      e.onclick = () => { filter(e); }
    })
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
