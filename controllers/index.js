var db = require('../models');


// home page
exports.home = function(req, res) {
  res.render('index', {title: 'Home Page'});
};


// get all searches
exports.searches = function(req, res, next) {

	// get all todos
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


// catch all 404
exports.fourzerofour = function(req, res) {
	res.render('index', {title: '404'});
};
