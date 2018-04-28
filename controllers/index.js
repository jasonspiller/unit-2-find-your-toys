var db 			= require('../models'),
		request = require('request');


// home page
exports.home = function(req, res) {
  res.render('index', {title: 'Search'});
};


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
exports.saveSearches = function(req, res, next) {

	db.Search.create(req.body, function(err) {
		if (err) {
			console.log('DB error: ' + err);
			res.sendStatus(500);
		}

		res.redirect('searches')
	});
};


// update search page
exports.updateSearchPage = function(req, res, next) {

	console.log(req.body);

	var data = {
		title: 'Update Search',
		results: req.body
	}
	res.render('updateSearch', data);
};


// save searches
exports.updateSearch = function(req, res, next) {

	console.log(req.body);

  db.Search.update({_id:req.body._id}, {description:req.body.description, searchString:req.body.searchString}, function(err, result) {
    if(err){
			console.log("Index Error: " + err);
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
				existing: true
			}

			console.log(data);

			res.render('google', data)
		})
	})
};


// delete search
exports.deleteSearch = function(req, res, next) {

	console.log(req.body);

	db.Search.deleteOne(req.body, function(err) {
		if (err) {
			console.log('DB error: ' + err);
			res.sendStatus(500);
		}

		res.redirect('/searches')
	});
};


// make Google API call
exports.google = function(req, res, next) {

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

		res.render('google', data);

	});
};


// catch all 404
exports.fourzerofour = function(req, res) {
	res.render('index', {title: 'Page Not Found: Try searching for more toys... '});
};
