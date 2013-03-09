/*
* Wrapper for localStorage
*/
function init() {
	if (localStorage.get('visited') == null) {
		init_storage();
		return false;
	}

	return true;
}

function init_storage() {

	var catlist = [ 'Modig', 'Kreativitet', 'Liker' ];
	var category = {
		'Modig' : {
			'Poeng': 0,
			'Lest' : []
		},
		'Kreativitet' : {
			'Poeng': 0,
			'Lest': []
		},
		'Liker' : {
			'Poeng': 0,
			'Lest': []
		}
	};

	var read = {
	};

	var whenthen = {
	};

	localStorage.setItem('catlist', catlist);
	localStorage.setItem('category', category);
	localStorage.setItem('read', read);
	localStorage.setItem('whenthen', whenthen);
	localStorage.setItem('visited', true);
}

/*
* Point functions
*/
function addPoints(points) {
	var currentStrength = sessionStorage.get('category');
	var cat = getStrength(currentStrength);

	if (cat == null) {
		return;
	}

	cat.Poeng += points;
}

function getPoints() {
	var currentCategory = sessionStorage.get('category');
	var cat = getStrength(currentCategory);

	if (cat == null) {
		return -1;
	}

	return cat.Poeng;
}

/*
* Strength functions
*/
function addStrength(cat) {
	var category = localStorage.get('category');
	
	category[cat] = {
		'Poeng' : 0,
		'Lest' : []
	}

	var list = localStorage.get('catlist');
	list.push(cat);
}

function getStrength(cat) {

	if (typeof cat == 'string') {
		var category = localStorage.get('category');
		return category[cat];
	} else if (typeof cat == 'number') {
		var category = localStorage.get('catlist');
		return category[cat];
	} else if (cat == null) {
		return localStorage.get('catlist');
	} 
}

/*
 * Pages
 */

function setRead() {
	/*
		The user just finished reading a page.
	*/
	var page_read = sessionStorage.get('page');
	var cat = sessionStorage.get('category');

	var toUpdate = localStorage.get(cat);

}

function hasRead(page) {
	var cat = sessionStorage.get('category');
	var pages_read = localStorage.get(cat);
//	var hasRead = jQuery.inArray(page, pages_read);
	
	for (var i = 0; i < pages_read.length; ++i) {
		if (pages_read[i] == page)
			return true;
	}

	return false;
}

function getRead() {
	var active = sessionStorage.get('category');
	var category = localStorage.get('category');

	return category[active]['Lest'];
}

/*
* SessionStorage stuff
*/

function setActiveCategory(cat) {
	sessionStorage.setItem('category', cat);
}