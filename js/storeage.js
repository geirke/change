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

	// Category
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

	localStoreage.setItem('category', category);
	localStoreage.setItem('read', read);
	localStoreage.setItem('whenthen', whenthen);
	localStoreage.setItem('visited', true);
}

/*
* Point functions
*/
function addPoints(points) {
	var currentCategory = sessionStoreage.get('category');
	var cat = getCategory(currentCategory);

	if (cat == null) {
		return;
	}

	cat.Poeng += points;
}

function getPoints() {
	var currentCategory = sessionStoreage.get('category');
	var cat = getCategory(currentCategory);

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

	localStoreage.setItem('category', category);
}

function getStrength(cat) {
	var category = localStoreage.get('category');
	return category[cat];
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
*
*/

function setActiveCategory(cat) {
	sessionStoreage.setItem('category', cat);
}