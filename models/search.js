// create schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SearchSchema = new Schema({
	description: String,
	searchString: String
 });

var Search = mongoose.model('Search', SearchSchema);

// mongoose static methods

module.exports = Search;
