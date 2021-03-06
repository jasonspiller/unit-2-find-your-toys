// dependencies
var express = require('express'),
		path 		= require('path'),
		parser 	= require('body-parser'),
		logger 	= require('morgan'),
		dotenv 	= require('dotenv').config(),
		app 		= express();


// routes
var indexRouter = require('./routes/index');


// views
app.set('views', './views');
app.set('view engine', 'ejs');


// setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);


//mLab port assignment
app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
	console.log('Hello Dave.')
})
