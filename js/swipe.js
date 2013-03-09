$(function() {
    $('div.ui-page').on('swipe', function() {});
});

$.event.special.swipe.handleSwipe = function(start, stop) {
    page = $.mobile.activePage[0];
    var dx = start.coords[0] - stop.coords[0];
    var dy = start.coords[1] - stop.coords[1];
    $.mobile.changePage("#flower");

    if (Math.abs(dx) > Math.abs(dy)) { //rl move
	if (dx > 0) {
	    if(page.dataset["right"]) {
		$.mobile.changePage(page.dataset["right"]); //right
	    }
	} else {
	    if(page.dataset["left"]) {
		$.mobile.changePage(page.dataset["left"]); //left
	    }
	}
    } else {
	if (dy > 0) {
	    if(page.dataset["down"]) {
		$.mobile.changePage(page.dataset["down"]); //down
	    }
	} else {
	    if(page.dataset["up"]) {
		$.mobile.changePage(page.dataset["up"]); //up
	    }
	}
    }
}