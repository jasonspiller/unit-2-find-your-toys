var express 		= require('express'),
		router 			= express.Router(),
		controller 	= require('../controllers');


// home page
router.get('/', controller.home);

// get all searches
router.get('/searches', controller.getSearches);

// save search
router.post('/searches', controller.saveSearches);

// update search page
router.post('/searches/update', controller.updateSearchPage);

// update search call
router.post('/search/update/:id', controller.updateSearch);

// delete search
router.post('/searches/delete/:id', controller.deleteSearch);

// search google
router.post('/google', controller.google);

// catch all 404
router.get('*', controller.fourzerofour);


module.exports = router;
