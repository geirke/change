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
		var gories = storage.category();

		gories[category] = {
			'points': 0,
			'pages': [],
			'whenthen': []
		}

		storage.categoryList().push(category);
	},

	get: function(category) {
		if (category == null) {
			category = session.category();
		}

		return storage.category(category);
	},

	getList: function(index) {
		return storage.categoryList()[index];
	},
	
	list: function() {
		return storage.categoryList();
	},
	
	addPoints: function(points) {
		var p = storage.category(session.getCategory());
		p.points += points;
	},

	getPoints: function(category) {
		if (category == null) {
			category = session.getCategory();
		}

		return storage.category(category).points;
	},

	addWhenThen: function(when, then, category) {
		if (category == null) {
			category = session.getCategory();
		}

		category = storage.category(category);
		category['whenthen'].push({when: when, then: then});
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
	category: function(category) {
		if (category == null) {
			return JSON.parse(localStorage.getItem('category'));
		}
		return JSON.parse(localStorage.getItem('category')[category]);
	},
	categoryList: function() {
		return JSON.parse(localStorage.getItem('catlist'));
	}
}


function init_storage() {
	if (JSON.parse(localStorage.getItem('visited')))
		return;

	localStorage.setItem('catlist', JSON.stringify([]));
	localStorage.setItem('category', JSON.stringify({}));
	localStorage.setItem('visited', JSON.stringify(true));

	category.add('modig');
	category.add('lære');
	category.add('kreativitet');
}
