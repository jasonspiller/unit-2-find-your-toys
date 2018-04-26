$(function() {

	console.log(process.env.GOOGLE_API_KEY);

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
