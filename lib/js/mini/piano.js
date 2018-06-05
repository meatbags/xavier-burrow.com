/**
 * Playable piano.
 */

class Piano {
  constructor() {
    this.ready = false;
    this.volume = 50;
    this.baseSemitone = 60;

    MIDI.loadPlugin({
      soundfontUrl: themePath + '/lib/sound/',
      instrument: 'acoustic_grand_piano',
      onprogress: (state, progress) => {},
      onsuccess: () => { this.ready = true; }
    });

    // assign key indices
    var whiteKey = 0;
    var blackKey = 0;
    document.querySelectorAll('.keys-white li, .keys-black li').forEach(e => {
      e.addEventListener('mouseenter', (e) => { this.playKey(e); });
      e.addEventListener('click', (e) => { this.playKey(e); });
      e.dataset.index = (e.parentNode.classList.contains('keys-white')) ? whiteKey++ : blackKey++;
    });
  }

  playKey(e) {
    if (this.ready) {
      const index = e.currentTarget.dataset.index;
      var tone = this.baseSemitone;
      var mod = Math.floor(index / 7);

      // get correct semitone
      if (e.currentTarget.parentNode.classList.contains('keys-white')) {
        tone += (index * 2) - mod;
        if (index > 2) {
          tone -= ((index % 7) > 2) ? mod + 1 : mod;
        }
      } else {
        tone += 1 + (index * 2) - mod;
        if (index > 1) {
          tone -= ((index % 7) > 1) ? mod + 1 : mod;
        }
      }

      // play note
      MIDI.setVolume(0, this.volume);
      MIDI.noteOn(0, tone, 10, 0);
      MIDI.noteOff(0, tone, 0.1);
    }
  }
}

export { Piano };
