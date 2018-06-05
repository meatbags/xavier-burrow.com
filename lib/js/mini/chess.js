/**
 * Playable chess board.
 */

class Chess {
  constructor() {
    this.board = document.querySelector('.chess-board ul');
    this.boardReset = document.querySelector('.chess-reset-board ul');
    document.querySelectorAll('.chess .reset').forEach(e => {
      e.onclick = () => {
        this.reset();
      }
    });
    this.setEvents();
  }

  setEvents() {
    document.querySelectorAll('.chess li').forEach(e => {
      
    });

    $("body").on("click", ".chess li", function(){
			if ($(".chess li.active").length) {
				var h = $(".chess li.active").html();
				$(".chess li.active").removeClass("active").html("");
				$(this).html(h);
			} else {
				$(this).addClass("active");
			}
		});
  }

  reset() {
    // reset the chess board
    this.board.innerHTML = this.boardReset.innerHTML;
    this.setEvents();
  }
}

export { Chess };
