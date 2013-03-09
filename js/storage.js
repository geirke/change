var read = {
	add: function(page) {

	},
	list: function() {

	},
	hasRead: function(page) {

	}
};

var category = {
	add: function(category) {
		var gories = storage.getCategories();

		gories[category] = {
			'points': 0,
			'pages': [],
			'whenthen': []
		}

		var list = storage.getCategoryList();
		list.push(category);

		storage.setCategoryList(list);
		storage.setCategories(gories);
	},

	get: function(category) {
		if (category == null) {
			category = session.category();
		}

		return storage.getCategory(category);
	},

	getList: function(index) {
		return storage.getCategoryList()[index];
	},
	
	list: function() {
		return storage.getCategoryList();
	},
	
	addPoints: function(points) {
		var curCat = session.getCategory();
		var category = storage.getCategory(curCat);
		category.points += points;
		storage.setCategory(curCat, category);
	},

	getPoints: function(category) {
		if (category == null) {
			category = session.getCategory();
		}

		return storage.getCategory(category).points;
	},

	addWhenThen: function(when, then, category) {
		if (category == null) {
			category = session.getCategory();
		}

		var gory = storage.getCategory(category);
		gory['whenthen'].push({when: when, then: then});
		storage.setCategory(category, gory);
	},

	getWhenThen: function(category) {
		if (category == null) {
			category = session.getCategory();
		}

		category = storage.category(category);
		return category['whenthen'];
	}
};

var session = {
	setCategory: function(category) {
		sessionStorage.setItem('category', JSON.stringify(category));
	},
	setPage: function(page) {
		sessionStorage.setItem('page', JSON.stringify(page));
	},
	getCategory: function() {
		return JSON.parse(sessionStorage.getItem('category'));
	},
	getPage: function() {
		return JSON.parse(sessionStorage.getItem('page'));
	}
}

var storage = {
	// Category
	getCategory: function(category) {
		if (category == null) {
			return JSON.parse(localStorage.getItem('category'));
		}
		return JSON.parse(localStorage.getItem('category'))[category];
	},

	setCategory: function(name, category) {
		var gories = storage.getCategories();
		gories[name] = category;
		storage.setCategories(gories);
	},

	// Categories
	getCategories: function() {
		return JSON.parse(localStorage.getItem('category'));
	},

	setCategories: function(category) {
		return localStorage.setItem('category', JSON.stringify(category));
	},

	// Category list
	getCategoryList: function() {
		return JSON.parse(localStorage.getItem('catlist'));
	},

	setCategoryList: function(list) {
		localStorage.setItem('catlist', JSON.stringify(list));
	}
}


function init_storage() {
/*
	if (JSON.parse(localStorage.getItem('visited')))
		return;
*/

	localStorage.setItem('catlist', JSON.stringify([]));
	localStorage.setItem('category', JSON.stringify({}));
	localStorage.setItem('visited', JSON.stringify(true));

	category.add('modig');
	category.add('lære');
	category.add('kreativitet');

	session.setCategory('modig');

	category.addPoints(5);
	category.addWhenThen('Skal ut på tur', 'Aldri sur');
}
