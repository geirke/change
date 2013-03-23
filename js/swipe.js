var mustReload = false;

$(function() {
    init_storage();
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
    var readList = read.list();
    $pages.each(function(index) {
	$this = $(this);
	var $content = $this.find('div[data-role="content"]');
	if ($content.find('.contentSplit').size() == 0) {
	    var $realContent = $content.children().clone();
	    $content.children().remove();
	    $content.append('<div class="contentSplit"><table class="fillPanel"><tr><td class="tdLeft"><div id="contentLeft" class="contentLeft"></div></td><td class="tdRight"><div id="contentRight" class="contentRight"></div></td></tr></table></div>');
	    $content.find('div#contentLeft').append($realContent);	    
	    var dotStr = '<div class="rightPanel"/><div class="rightPanelAbs"><div class="innerRightPanelAbs">';
	    for (var i = 0; i < numPages; ++i) {
		if (i == index) {
		    dotStr += '<div class="activeDot"/>';
		} else {
		    dotStr += '<div class="greyDot" onClick="gotoPage(' + index + ', ' + i + ')"/>';
		}
	    }
	    dotStr += '</div></div>';
	    $content.find('div#contentRight').append(dotStr);
	}
	var $textContent = $this.find('div[data-text="true"]');
	var textId = $this.attr('id');
	if ($textContent.find('div.readingCheckbox').size() == 0) {
	    if (read.hasRead(readList, textId)) {
			$textContent.append('<div class="readCheckbox readingCheckbox"/>');
			$textContent.find('.unreadCheckbox').on('click', function() {});
	    } else {
			$textContent.append('<div class="unreadCheckbox readingCheckbox"/>');
			$textContent.find('.unreadCheckbox').on('click', function() {
			    readText($(this), textId);
			});
	    }
	}
    });
}

function gotoPage(from, index, last) {
    if (last === undefined) {
	last = -1;
    }
    var direction = (index < from ? 'down' : 'up');	
    var name = '#p' + index;
    if (index == 0) {
	direction = 'down';
	name = '#main';
    }
    if (last ==1) {
	$.mobile.changePage(name, { transition: "slideup" });	
    } else if (last == 2) {
	$.mobile.changePage(name, { transition: "slidedown" });
    } else {
	$.mobile.changePage(name, { transition: "slide" + direction });
    }
}

function readText($div, textId) {
    read.add(textId);
    $scoreDiv = $('div#scoreDiv');
    if ($scoreDiv.size() == 0) {
	$div.removeClass('unreadCheckbox');
	$div.addClass('checkedCheckbox');
    }
}

$.event.special.swipe.handleSwipe = function(start, stop) {
    originclasses = start.origin.attr('class');
    if (stop.time - start.time > $.event.special.swipe.durationThreshold ||
            originclasses && (originclasses.indexOf('ui-btn') !== -1
                              || originclasses.indexOf('ui-slider') !== -1)) {
        return false;
    }
    page = $.mobile.activePage[0];
    var dx = start.coords[0] - stop.coords[0];
    var dy = start.coords[1] - stop.coords[1];

    if (Math.abs(dx) < $.event.special.swipe.horizontalDistanceThreshold
            && Math.abs(dy) < $.event.special.swipe.horizontalDistanceThreshold) {
        return false;
    }

    if (Math.abs(dx) > Math.abs(dy)) { //rl move
	if (dx > 0) {
		var dset = page.dataset["right"];
	    if(dset) {
	    	console.log("BITTCHEESS");
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
	var l = $('[data-role="page"]');
	console.log($.mobile.activePage.attr('id') == 'main');
	console.log(l.length);
	var from = $.mobile.activePage.attr('id');

	if (dy > 0) { //down
	    if (from == 'main') {
		gotoPage(0,1);
	    } else {
		fromIndex = parseInt(from.substring(1,2));
		if (fromIndex == $('[data-role="page"]').length-1) {
		    gotoPage(fromIndex, 0, 1);
		} else {
		    gotoPage(fromIndex, fromIndex+1);
		}
	    }
	} else {
	    if (from == 'main') {
		gotoPage(0, $('[data-role="page"]').length-1, 2);
	    } else {
		fromIndex = parseInt(from.substring(1,2));
		gotoPage(fromIndex, fromIndex-1);
	    }
	}
    }
}
