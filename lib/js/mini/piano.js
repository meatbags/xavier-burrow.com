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

    this.playKey = (e) => {
      if (this.ready) {
        var tone = this.baseSemitone;
        const index = e.currentTarget.dataset.index;
        var mod = Math.floor(index / 7);

        // get correct semitone
        if (e.currentTarget.parentNode.classList.contains('keys-white')) {
          tone += (index * 2) - mod;
          if (i > 2) {
            tone -= ((index % 7) > 2) ? mod + 1 : mod;
          }
        } else {
          tone += 1 + (index * 2) - mod;
          if (i > 1) {
            tone -= ((index % 7) > 1) ? mod + 1 : mod;
          }
        }

        // play note
        MIDI.setVolume(0, this.volume);
        MIDI.noteOn(0, tone, 10, 0);
        MIDI.noteOff(0, tone, 0.1);
      }
    };

    // assign key indices
    var whiteKey = blackKey = 0;
    document.querySelectorAll('.keys-white li, .keys-black li').forEach(e => {
      e.addEventListener('mouseenter click', this.playKey);
      e.dataset.index = (e.parentNode.classList.contains('keys-white')) ? whiteKey++ : blackKey++;
    });
  }
}

export { Piano };
