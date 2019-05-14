function view() {
	function titleView() { $("#show #view").append('<div class="page-header"><h1>Teacher view</h1></div>') };

	$('#show').empty();
	$('#show').append('<div id="view"></div>');
	titleView();

	/*
		datesList
	*/
	function datesList() {
		$.ajax({
			type:"GET",
			dataType:"json",
			url: "./src/learning-records/results.php?q=teacher",
			success: function(dates) {
				// console.log(dates);
				var ldates = dates;
				var r_dates = [];

				// console.log(ldates);
				$.each(ldates.dates, function() {
					$.each(this, function(k, v) {
						if(k == 'date')
							r_dates.push(v);
					});
				});
				
				// console.log(r_dates);

				$('#first').append('<h4>DATES</h4>');
				$.each(r_dates, function(i, item) {
					$('#first').append('<p>'+item+'</p>\n');
				});
			}
		});
	}

	/*
		usersList
	*/
	function usersList() {
		var str = '';

		$('#first p').on("click", function() {
			str = $('#first p').text();
		});

		$('#second').append('<h4>USERS</h4>');

		console.log(str);
		$.ajax({
			type:"GET",
			dataType:"json",
			url: "./src/learning-records/results.php?q=teacher&d="+str,
			success: function(users) {
				// console.log(dates);
				var lusers = users;
				var r_users = [];

				// console.log(ldates);
				$.each(lusers.users, function() {
					$.each(this, function(k, v) {
						if(k == 'user')
							r_users.push(v);
					});
				});
				
				// console.log(r_dates);
				$.each(r_users, function(i, item) {
					$('#second').append('<p>'+item+'</p>\n');
				});
			}
		});
	}


	function box() {
		$('#view').append('<div id="first"></div>');
		$('#view').append('<div id="second"></div>');
	}

	box();
	datesList();
	usersList();
}