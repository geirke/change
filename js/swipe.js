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
	var numPages = $pages.size();
	$pages.each(function(index) {
		$this = $(this);
		var $content = $this.find('div[data-role="content"]');
		if ($content.find('.contentSplit').size() == 0) {
			var $realContent = $content.children().clone();
			$content.children().remove();
			$content.append('<div class="contentSplit"><table class="fillPanel"><tr><td class="tdLeft"><div id="contentLeft" class="contentLeft"></div></td><td class="tdRight"><div id="contentRight" class="contentRight"></div></td></tr></table></div>');
			$content.find('div#contentLeft').append($realContent);
			var dotStr = '<div class="rightPanel">';
			for (var i = 0; i < numPages; ++i) {
				if (i == index) {
					dotStr += '<div class="activeDot"/>';
				} else {
					dotStr += '<div class="greyDot" onClick="gotoPage(' + index + ', ' + i + ')"/>';
				}
			}
			dotStr += '</div>';
			$content.find('div#contentRight').append(dotStr);
		}
	});
}

function gotoPage(from, index) {
	var direction = (index > from ? 'down' : 'up');	
	var name = '#p' + index;
	if (index == 0) {
		direction = 'up';
		name = '#main';
	}
    $.mobile.changePage(name, { transition: "slide" + direction });	
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
