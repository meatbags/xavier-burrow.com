import './lib/mobile_check.js';
import './lib/post_processing';
import Master from './modules/master';

class App {
  constructor() {
    // handle DOM input and init app

    this.isMobile = window.mobileCheck();

    // app

    this.master = new Master(this.isMobile);

    // app events

    window.onblur = () => { this.master.blur(); };
    window.onfocus = () => { this.master.focus(); };
    window.onresize = () => { this.master.resize(); };
    window.onmousemove = (e) => { this.master.handleMouse(e.clientX, e.clientY); };
    window.addEventListener('orientationchange', () => { this.master.resize(); });

    // scrolling

    $('body').scroll(() => {
      this.scroll = (new Date()).getTime();

      // check for scroll complete

      setTimeout(() => {
        if ((new Date()).getTime() - this.scroll >= 5) {
          this.master.reset();
        }
      }, 10);
    });

    // navigation

    this._navigation();

    // mini apps

    this._piano();
    this._chess();

    // run

    this.master.run();
  }

  _piano() {
    // init the piano app

    let pianoReady = false;

		MIDI.loadPlugin({
			soundfontUrl: themePath + "/lib/sound/",
			instrument: "acoustic_grand_piano",
			onprogress: function(state, progress) {},
			onsuccess: () => {
				pianoReady = true;
			}
		});

		$(".keys-white li, .keys-black li").on("mouseenter click", function() {
			if (pianoReady) {
				var k, i, semi, vol;

				vol = 50;
				k = $(this);
				i = k.index();
				semi = 60;

				if (k.parents(".keys-white").length) {
					var mod = Math.floor(i / 7);
					semi += (i * 2) - mod;
					if (i > 2) {
						semi -= ((i % 7) > 2) ? mod + 1 : mod;
					}
				} else {
					var mod = Math.floor(i / 7);
					semi += 1 + (i * 2) - mod;
					if (i > 1) {
						semi -= ((i % 7) > 1) ? mod + 1 : mod;
					}
				}

				MIDI.setVolume(0, vol);
				MIDI.noteOn(0, semi, 10, 0);
				MIDI.noteOff(0, semi, 0.1);
			}
		});
  }

  _chess() {
    // chess app

    $("body").on("click", ".chess li", function(){
			if ($(".chess li.active").length) {
				var h = $(".chess li.active").html();
				$(".chess li.active").removeClass("active").html("");
				$(this).html(h);
			} else {
				$(this).addClass("active");
			}
		});

		$(".chess .reset").on("click", function(){
			$(".chess-board ul").html($(".chess-reset-board ul").html());
		});
  }

  _navigation() {
    // set up navigation

    $('#to-menu, .to-back').on('click', () => { this._open($('#section-menu')); });
    $('#to-projects').on('click', () => { this._open($('#section-projects')); });
  }

  _open(section) {
    // go to section & trigger app update

    $('.section, .section .box').removeClass('active');
    section.addClass('active');
    section.find('.box').addClass('active');

    // set app state

    this.master.reset();
  }
}

window.onload = () => { const app = new App(); };
