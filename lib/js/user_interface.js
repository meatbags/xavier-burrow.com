class UserInterface {
  constructor() {
    this.initSections();
    this.initFilters();
    this.removeLoadingScreen();
  }

  initSections() {
    this.closeSection = () => {
      document.querySelector('.wrapper').classList.remove('hidden');
      document.querySelector('.project-pane').classList.remove('active');
      document.querySelector('html').classList.remove('freeze');
    };
    this.openSection = (e) => {
      document.querySelector('.wrapper').classList.add('hidden');
      document.querySelector('.project-pane').classList.add('active');
      document.querySelector('html').classList.add('freeze');
    };
    document.querySelector('#project-pane-close').onclick = () => {
      this.closeSection();
    };
    document.querySelectorAll('.section').forEach(e => {
      e.onclick = (e) => {
        this.openSection(e.currentTarget);
      }
    });
  }

  initFilters() {
    const filter = (e) => {
      document.querySelectorAll('.filters .item').forEach(el => { el.classList.remove('active'); });
      e.classList.add('active');
    };
    document.querySelectorAll('.filters .item').forEach(e => {
      e.onclick = () => { filter(e); }
    })
  }

  removeLoadingScreen() {
    document.querySelector('.loading-screen').remove();
    document.querySelector('.sections').classList.add('active');
  }
}

export { UserInterface };
