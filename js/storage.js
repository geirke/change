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
	
	list: function() {
		return storage.categoryList();
	},
	
	addPoints: function(points) {
		var p = storage.category(session.getCategory());
		p.points += points;
	},

	getPoints: function(category) {
		if (category == null) {
			return storage.category(session.getCategory()).points;
		}

		return storage.category(category).points;
	},

	addWhenThen: function(when, then, category) {
		if (category == null) {
			category = session.getCategory();
		}
		
		category = storage.category(category);
		category['whenthen'].push({when: when, then:then});
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
		sessionStorage.setItem('category', category);
	},
	setPage: function(page) {
		sessionStorage.setItem('page', page)
	},
	getCategory: function() {
		return sessionStorage.get('category');
	},
	getPage: function() {
		return sessionStorage.get('page');
	}
}

var storage = {
	category: function(category) {
		return localStorage.get('category')[category];
	},
	categoryList: function() {
		return localStorage.get('catlist');
	}
}


function init() {
	if (localStorage.get('visited'))
		return;

	var catlist = [ 'Modig', 'Kreativitet', 'Liker' ];
	var category = {
		'Modig' : {
			'points': 0,
			'pages' : [],
			'whenthen' : []
		},
		'Kreativitet' : {
			'points': 0,
			'pages': [],
			'whenthen' : []
		},
		'Liker' : {
			'points': 0,
			'pages': [],
			'whenthen' : []
		}
	};

	var read = {
	};

	var whenthen = {
	};

	localStorage.setItem('catlist', catlist);
	localStorage.setItem('category', category);
	localStorage.setItem('read', read);
	localStorage.setItem('visited', true);
}