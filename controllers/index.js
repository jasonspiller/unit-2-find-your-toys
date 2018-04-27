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


// save searches
exports.updateSearch = function(req, res, next) {

	// db.Search.update(req.body, function(err) {
	// 	if (err) {
	// 		console.log('DB error: ' + err);
	// 		res.sendStatus(500);
	// 	}

		res.redirect('searches')

};


// save searches
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

	console.log();

	var strGoogleAPI 			= 'https://www.googleapis.com/customsearch/v1',
			strGoogleAPIKey 	= process.env.GOOGLE_API_KEY,
			strGoogleSearchID = '016727189182641024167:t9tcn00re6o',
			strSearchString 	= req.body.searchInput;

	// create Google API url
 	var strGoogleAPIUrl = `${strGoogleAPI}?key=${strGoogleAPIKey}&cx=${strGoogleSearchID}&q=${strSearchString}`;

	console.log(strGoogleAPIUrl);
	console.log(encodeURI(strGoogleAPIUrl));

	// make request call
	request(encodeURI(strGoogleAPIUrl), { json: true }, (error, response, body) => {
	  if(error) {
			return console.log(error);
		}

		var data = {
			title: 'Searched:',
			results: body
		}

		res.render('google', data);

	});


};


// catch all 404
exports.fourzerofour = function(req, res) {
	res.render('index', {title: '404'});
};
