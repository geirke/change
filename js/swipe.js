var mustReload = false;
$(function() {
	initPage();
    $(document).bind("pagechange", initPage);
});

function initPage() {
	if (mustReload) {
	    mustReload = false;
	    window.location.reload();
	}
	var $pages = $('div[data-role="page"]');
	$pages.on('swipe', function() {});
	$pages.each(function() {
		$this = $(this);
		$this.append('<div class="rightPanel"></div>');
	});
}

$.event.special.swipe.handleSwipe = function(start, stop) {
	page = $.mobile.activePage[0];
	var dx = start.coords[0] - stop.coords[0];
	var dy = start.coords[1] - stop.coords[1];

	if (Math.abs(dx) > Math.abs(dy)) { //rl move
	    if (dx > 0) {
		if(page.dataset["right"]) {
		    mustReload = true;
		    console.log(page.dataset["right"]);
		    $.mobile.changePage(page.dataset["right"], { reloadPage: true, transition: "slide" }); //right
		}
	    } else {
		if(page.dataset["left"]) {
		    mustReload = true;
		    console.log(page.dataset["left"]);
		    $.mobile.changePage(page.dataset["left"], { reloadPage: true, transition: "slide", reverse: true }); //left
		}
	    }
	} else {
	    if (dy > 0) {
		if(page.dataset["down"]) {
		    console.log(page.dataset["down"]);
		    $.mobile.changePage(page.dataset["down"], { transition: "slideup" }); //down
		}
	    } else {
		if(page.dataset["up"]) {
		    console.log(page.dataset["up"]);
		    $.mobile.changePage(page.dataset["up"], { transition: "slidedown" }); //up
		}
	    }
	}
}
