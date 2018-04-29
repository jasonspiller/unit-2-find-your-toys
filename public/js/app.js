console.log('Hello Dave.');

$(function() {

	$('#signup-form').on('submit', function(e) {
		e.preventDefault();

		var formData = {
			email: 		$('input[name="email"]').val(),
			password: $('input[name="password"]').val()
		}

		console.log(formData);

		$.ajax({
			url				: ('/signup'),
			method		: 'POST',
			data			: formData,
			success		: postSuccess,
			fail			: postFail
		})

		function postSuccess() {
			console.log('Post Succeeded');
		}

		function postFail() {
			console.log('Post Failed');
		}

	})


	$('#login-form').on('submit', function(e) {
		e.preventDefault();

		var formData = {
			email: 		$('input[name="email"]').val(),
			password: $('input[name="password"]').val()
		}

		console.log(formData);

		$.ajax({
			url				: ('/sessions'),
			method		: 'POST',
			data			: formData,
			success		: loginSuccess,
			fail			: loginFail
		})

		function loginSuccess() {
			console.log('Login Succeeded');
			window.location = '/profile';
		}

		function loginFail() {
			console.log('Login Failed');
		}

	})

})
