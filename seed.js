// seeds our database for testing purposes
var db = require('./models');

var search_list = [
  {
    description: 'Optimus Prime Toys',
		searchString: 'Optimus Prime'
  },
	{
		searchString: 'KO Transformers'
	}
];

// remove all records
db.Search.remove({}, function(err, searches){

  if(err) {
    console.log('Remove error: ', err);

  } else {
    console.log('Removed all Searches');

    // create new records
    db.Search.create(search_list, function(err, searches){

      if(err) {
				return console.log('Create error: ', err);
			}

      console.log('Searches created: ', searches.length, 'search');
      process.exit();
    });
  }
});
