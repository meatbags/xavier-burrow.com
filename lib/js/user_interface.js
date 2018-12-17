class UserInterface {
  constructor(isMobile, root) {
    this.isMobile = isMobile;
    this.root = root;
    this.initSections();
    this.initFilters();
    this.loadVideos();
  }

  openSection(e) {
    // data
    this.pane.title.innerHTML = e.querySelector('.title').innerHTML;
    this.pane.date.innerHTML = e.querySelector('.date').innerHTML;
    this.pane.description.innerHTML = e.querySelector('.description').innerHTML;

    // media
    const images = e.querySelector('.image').innerHTML;
    const video = e.querySelector('.video').innerHTML;
    this.pane.video.innerHTML = video ? video : '';

    // hook up gallery
    if (images != '') {
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
    document.querySelector('html').classList.add('freeze');

    // hash
    window.location.hash = '#' + this.pane.title.innerHTML;

    // animation
    if (this.isMobile) {
      this.root.overlay2D.scatter();
    }
  };

  closeSection() {
    document.querySelector('.wrapper').classList.remove('hidden');
    document.querySelector('.project-pane').classList.remove('active');
    document.querySelector('html').classList.remove('freeze');
  }

  initSections() {
    this.pane = {
      title: document.querySelector('.project-pane .title'),
      date: document.querySelector('.project-pane .date'),
      description: document.querySelector('.project-pane .description'),
      image: document.querySelector('.project-pane .image'),
      video: document.querySelector('.project-pane .video'),
      links: document.querySelector('.project-pane .links'),
    };

    document.querySelectorAll('.project-pane-close').forEach(e => {
      e.addEventListener('click', () => { this.closeSection(); });
    });
    document.querySelectorAll('.section').forEach(e => {
      e.addEventListener('click', evt => { this.openSection(evt.currentTarget); });
    });
    document.querySelectorAll('.contact').forEach(e => {
      e.addEventListener('click', () => { this.openSection(document.querySelector('.section-contact')); });
    });

    // handle back button
    window.addEventListener('hashchange', evt => {
      if (window.location.hash === '' && document.querySelector('.wrapper').classList.contains('hidden')) {
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
