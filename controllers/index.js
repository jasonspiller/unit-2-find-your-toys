var db 			= require('../models'),
		request = require('request');


// home page
exports.home = function(req, res) {
  res.render('index', {title: 'Home Page'});
};


// get all searches
exports.searches = function(req, res, next) {

	// query the db
  db.Search.find(function(err, searches){
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


// get all searches
exports.google = function(req, res, next) {

 	var strUrl = `https://www.googleapis.com/customsearch/v1?&cx=016727189182641024167%3At9tcn00re6o&key=${process.env.GOOGLE_API_KEY}&q=Optimus+Prime`;

	console.log(strUrl);

	// make request call
	request(strUrl, { json: true }, (error, response, body) => {
	  if(error) {
			return console.log(error);
		}

		console.log(body);

		var data = {
			title: 'Searches',
			results: body
		}

		res.render('google', data);

	});


};


// catch all 404
exports.fourzerofour = function(req, res) {
	res.render('index', {title: '404'});
};
