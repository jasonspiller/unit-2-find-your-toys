// create schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SearchSchema = new Schema({
	description: String,
	searchString: String
 });

const Search = mongoose.model('Search', SearchSchema);

module.exports = Search;