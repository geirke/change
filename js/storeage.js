/*
* Wrapper for localStoreage
*/
function init() {
	if (localStoreage.get('visited') == null) {
		init_storeage();
		return false;
	}

	return true;
}

function init_storeage() {

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

	localStoreage.setItem('catlist', catlist);
	localStoreage.setItem('category', category);
	localStoreage.setItem('read', read);
	localStoreage.setItem('whenthen', whenthen);
	localStoreage.setItem('visited', true);
}

/*
* Point functions
*/
function addPoints(points) {
	var currentStrength = sessionStoreage.get('category');
	var cat = getStrength(currentStrength);

	if (cat == null) {
		return;
	}

	cat.Poeng += points;
}

function getPoints() {
	var currentCategory = sessionStoreage.get('category');
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
	var category = localStoreage.get('category');
	
	category[cat] = {
		'Poeng' : 0,
		'Lest' : []
	}

	var list = localStoreage.get('catlist');
	list.push(cat);
}

function getStrength(cat) {

	if (typeof cat == 'string') {
		var category = localStoreage.get('category');
		return category[cat];
	} else if (typeof cat == 'number') {
		var category = localStoreage.get('catlist');
		return category[cat];
	} else if (cat == null) {
		return localStoreage.get('catlist');
	} 
}

/*
 * Pages
 */

function setRead() {
	/*
		The user just finished reading a page.
	*/
	var page_read = sessionStoreage.get('page');
	var cat = sessionStoreage.get('category');

	var toUpdate = localStoreage.get(cat);

}

function hasRead(page) {
	var cat = sessionStoreage.get('category');
	var pages_read = localStoreage.get(cat);
//	var hasRead = jQuery.inArray(page, pages_read);
	
	for (var i = 0; i < pages_read.length; ++i) {
		if (pages_read[i] == page)
			return true;
	}

	return false;
}

function getRead() {
	var active = sessionStoreage.get('category');
	var category = localStoreage.get('category');

	return category[active]['Lest'];
}

/*
* SessionStoreage stuff
*/

function setActiveCategory(cat) {
	sessionStoreage.setItem('category', cat);
}