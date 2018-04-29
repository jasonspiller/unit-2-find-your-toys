var express 		= require('express'),
		session 		= require('express-session'),
		router 			= express.Router(),
		controller 	= require('../controllers');



// home page
router.get('/', controller.home);



// SEARCHES

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



// USER

// session
router.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 30 * 60 * 1000 } // 30 minute cookie lifespan (in milliseconds)
}));

// login page
router.get('/signin', controller.signin);

// user login
router.post('/signin', controller.signinUser);

// signup
router.get('/signup', controller.signup);

// post user informaiton
router.post('/signup', controller.signupUser);

// user profile page
router.get('/profile', controller.profile);

// post user informaiton
router.post('/sessions', controller.session);

// log the user out
router.get('/signout', controller.signout);



// catch all 404
router.get('*', controller.fourzerofour);



module.exports = router;
