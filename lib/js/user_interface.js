class UserInterface {
  constructor(isMobile, root) {
    this.isMobile = isMobile;
    this.root = root;
    this.initSections();
    this.initFilters();
    this.removeLoadingScreen();
  }

  initSections() {
    const pane = {
      title: document.querySelector('.project-pane .title'),
      date: document.querySelector('.project-pane .date'),
      description: document.querySelector('.project-pane .description'),
      image: document.querySelector('.project-pane .image'),
      video: document.querySelector('.project-pane .video'),
      links: document.querySelector('.project-pane .links'),
    };
    this.closeSection = () => {
      document.querySelector('.wrapper').classList.remove('hidden');
      document.querySelector('.project-pane').classList.remove('active');
      document.querySelector('html').classList.remove('freeze');

      // hash
      window.location.hash = '';
    };
    this.openSection = (e) => {
      // data
      pane.title.innerHTML = e.querySelector('.title').innerHTML;
      pane.date.innerHTML = e.querySelector('.date').innerHTML;
      pane.description.innerHTML = e.querySelector('.description').innerHTML;

      // media
      const images = e.querySelector('.image').innerHTML;
      const video = e.querySelector('.video').innerHTML;
      pane.video.innerHTML = video ? video : '';

      // hook up gallery
      if (images != '') {
        pane.image.innerHTML = images;
        const slides = pane.image.querySelectorAll('.slider .slides .slide');
        const thumbs = pane.image.querySelectorAll('.slider .thumbnails .thumb');
        slides.forEach(e => { e.classList.remove('active'); });
        for (var i=0, len=thumbs.length; i<len; ++i) {
          const e = thumbs[i];
          e.dataset.index = i;
          e.classList.remove('active');
          e.onmousedown = () => {
            const index = e.dataset.index;
            if (slides[index]) {
              pane.image.querySelectorAll('.slide.active, .thumb.active').forEach(e => { e.classList.remove('active'); });
              slides[index].classList.add('active');
              e.classList.add('active');
            }
          }
        }
        slides[0].classList.add('active');
        thumbs[0].classList.add('active');
      } else {
        pane.image.innerHTML = '';
      }

      // activate
      document.querySelector('.wrapper').classList.add('hidden');
      document.querySelector('.project-pane').classList.add('active');
      document.querySelector('html').classList.add('freeze');

      // hash
      window.location.hash = '#project';

      // animation
      if (this.isMobile) {
        this.root.overlay2D.scatter();
      }
    };
    document.querySelectorAll('.project-pane-close').forEach(e => {
      e.onclick = () => {
        this.closeSection();
      }
    });
    document.querySelectorAll('.section').forEach(e => {
      e.onclick = (e) => {
        this.openSection(e.currentTarget);
      }
    });
    document.querySelectorAll('.contact').forEach(e => {
      e.onclick = () => {
        this.openSection(document.querySelector('.section-contact'));
      };
    });

    // handle back button
    window.addEventListener('hashchange', () => {
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

  removeLoadingScreen() {
    //document.querySelector('.loading-screen').remove();
    //document.querySelector('.sections').classList.add('active');
  }
}

export { UserInterface };
