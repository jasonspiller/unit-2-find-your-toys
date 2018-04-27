$(function() {

	console.log();

	$('#search').on('submit', function(e) {
		e.preventDefault();

		function googleSuccess(response) {
			console.log('Google Succeeded');
			console.log(response);
		}

		function googleFail(err) {
			console.log(err);
		}


	})

})
