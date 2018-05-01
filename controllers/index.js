var db 			= require('../models'),
		request = require('request');



// home page
exports.home = function(req, res) {
  res.render('index', {title: 'Search'});
};



// USERS

// login
exports.signin = function (req, res) {
	data = {
		title: 'Sign In'
	}
  res.render('signin', data);
};

// user login
exports.signinUser = function (req, res) {
	db.User.findOne({_id: req.session.userId}, function (err, currentUser) {
		res.render('profile', {user: currentUser})
	});
};

// signup
exports.signup = function (req, res) {
	data = {
		title: 'Sign Up'
	}
  res.render('signup', data);
};

// user signup
exports.signupUser = function(req, res) {
	// create user in the db
	db.User.createSecure(req.body.name, req.body.email, req.body.password, function (err, signin) {
		if (err) {
			console.log('Create error: ' + err);
			res.sendStatus(500);
		}
		res.redirect('signin')
  });
};

// user profile
exports.profile = function(req, res) {
	db.User.findOne({_id: req.session.userId}, function(err, currentUser) {
		res.render('profile', {user: currentUser})
	});
};


// get all user searches
exports.userSearches = function(req, res, next) {

	// query the db
	db.User.findOne({_id: req.session.userId}, function (err, currentUser) {
		if (err) {
      console.log('DB error: ' + err);
      res.sendStatus(500);
    }
		var data = {
			title: currentUser.name + '\'s Searches',
			user: currentUser,
			results: currentUser.searches
		}

		res.render('searches', data);
  });
};

// user sessions
exports.session = function (req, res) {

	console.log(req.body);
	// call authenticate function to check if password user entered is correct
	db.User.authenticate(req.body.email, req.body.password, function (err, existingUser) {
		if (err) {
			console.log('Error is ' + err);
		}

		req.session.userId = existingUser._id;

		res.json(existingUser);
	});
};

// user logout
exports.signout = function (req, res) {
  // remove the session user id
  req.session.userId = null;
  // redirect to login (for now)
  res.redirect('/');
};



// SEARCHES

// get all searches
exports.getSearches = function(req, res, next) {

	// query the db
  db.Search.find(function(err, searches) {
    if (err) {
      console.log('DB error: ' + err);
      res.sendStatus(500);
    }
		var data = {
			title: 'Searches',
			results: searches
		}
		res.render('searches', data);
  });
};


// save searches
exports.saveSearch = function(req, res, next) {

	console.log(req.body);

	db.Search.create(req.body, function(err, result) {
		if(err){
			console.log("Index Error: " + err);
			res.sendStatus(500);
		}

		res.redirect('/searches')
	});
};


// save new search
exports.saveUserSearch = function(req, res, next) {

	db.User.findOne({_id:req.session.userId}, function(err, user) {
		if(err){
			console.log("Index Error: " + err);
			res.sendStatus(500);
		}

		var newSearch = new db.Search (req.body)

		console.log(newSearch);

		user.searches.push(req.body);

		console.log(user.searches);

		user.save(function(err, updatedDocument){
			res.redirect('/user/searches')
		})
	});
};

// update search page
exports.updateSearchPage = function(req, res, next) {

	var data = {
		title: 'Update Search',
		results: req.body
	}
	res.render('updateSearch', data);
};

// update search
exports.updateSearch = function(req, res, next) {

	db.User.updateOne({_id: req.session.userId, 'searches._id': req.body._id}, { $set: { "searches.$.description":req.body.description, "searches.$.searchString":req.body.searchString } }, function(err, result) {
    if(err){
			console.log("Update Error: " + err);
			res.sendStatus(500);
    }

		// go back to the search results page
		var strGoogleAPI 			= 'https://www.googleapis.com/customsearch/v1',
				strGoogleAPIKey 	= process.env.GOOGLE_API_KEY,
				strGoogleSearchID = '016727189182641024167:t9tcn00re6o',
				strSearchString 	= req.body.searchString;

		// create Google API url
	 	var strGoogleAPIUrl = `${strGoogleAPI}?key=${strGoogleAPIKey}&cx=${strGoogleSearchID}&q=${strSearchString}`;

		// make request call
		request(encodeURI(strGoogleAPIUrl), { json: true }, (err, response, results) => {
		  if(err) {
				console.log("API Error" + err);
			}

			console.log(results);

			var data = {
				title: 'Searched: ',
				results: results,
				_id: req.body._id,
				description: req.body.description,
				searchString: req.body.searchString,
				existing: true
			}

			res.render('results', data)
		});
	});
};

// delete search
exports.deleteSearch = function(req, res, next) {

	db.User.update({_id:req.session.userId}, { $pull: {searches: req.body} }, function(err, user) {
		if(err){
			console.log("Update Error: " + err);
			res.sendStatus(500);
		}
		res.redirect('/user/searches')
	})
};

// make Google API call
exports.results = function(req, res, next) {

	var strGoogleAPI 			= 'https://www.googleapis.com/customsearch/v1',
			strGoogleAPIKey 	= process.env.GOOGLE_API_KEY,
			strGoogleSearchID = '016727189182641024167:t9tcn00re6o',
			strSearchString 	= req.body.searchString;

	// create Google API url
 	var strGoogleAPIUrl = `${strGoogleAPI}?key=${strGoogleAPIKey}&cx=${strGoogleSearchID}&q=${strSearchString}`;

	// make request call
	request(encodeURI(strGoogleAPIUrl), { json: true }, (error, response, body) => {
	  if(error) {
			return console.log(error);
		}

		var data = {
			title: 'Searched: ',
			results: body,
			_id: req.body._id,
			description: req.body.description,
			searchString: req.body.searchString,
			existing: req.body.existing
		}

		res.render('results', data);

	});
};



// catch all 404
exports.fourzerofour = function(req, res) {
	res.render('index', {title: 'Page Not Found: Try searching for more toys... '});
};
