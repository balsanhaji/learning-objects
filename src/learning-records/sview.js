/* Student view */
function sview() {
	function titleView() { $("#show #sview").append('<div class="page-header"><h1>Student view</h1></div>') };

	$('#show').empty();
	$('#show').append('<div id="sview"></div>');
	titleView();

	/* Display the search input field and call the getUsersList function */
	function searchUser() {
		var searchUser = '<div class="input-group col-xs-5">';
			searchUser += '<span class="input-group-addon">@</span>';
			searchUser += '<input type="text" id="getUser" class="form-control" placeholder="Type a nickname to see its progress">';
			searchUser += '</div>';
			searchUser += '<div class="error"></div><hr/>';

		$("#show #sview").append(searchUser);
	}

	function getUser() {
		$.ajax({
			type:"POST",
			dataType:"json",
			url: "./src/learning-records/results.php",
			success: function(userList) {
				var show = userList;
				var usersArray = new Array();

				$.each(show.users, function() {	
					$.each(this, function(k, v) {
						if(k == 'name')
							usersArray.push(v);
					});
				});

				$('#getUser').autocomplete({
					source: usersArray,
					minLength:3
				});

				// datesList();
				$('#getUser').on('autocompletechange change', function() {
					var username = this.value;

					console.log(username);
					$.ajax({
						type:"GET",
						dataType:"json",
						url: "./src/learning-records/results.php?q="+username,
						success: function(userInfos) {
							var record = userInfos;
							var r_year = [], r_month = [], r_day = [], r_answer = [], r_result = [];

							$.each(record.records, function() {
								$.each(this, function(k, v) {
									if(k == 'year')
										r_year.push(v);
									if(k == 'month')
										r_month.push(v);
									if(k == 'day')
										r_day.push(v);
									if(k == 'answer')
										r_answer.push(v);
									if(k == 'result')
										r_result.push(v);
								});
							});

							$.each(r_day, function(i, item) {
								$('#first').append('<p class="r_date">'+r_year+' '+item+' '+r_day+'</p>\n');
							});
						}
					});
				}).change();
			}
		});
	}

	/*
		datesList
	*/
	function datesList() {
		// $('#getUser').on('autocompletechange change', function() {
		// 	var username = this.value;

		// 	console.log(username);
		// 	$.ajax({
		// 		type:"GET",
		// 		dataType:"json",
		// 		url: "./src/learning-records/results.php?q="+username,
		// 		success: function(userInfo) {
		// 			var record = userInfo;
		// 			var r_year = [], r_month = [], r_day = [], r_answer = [], r_result = [];

		// 			$.each(record.records, function() {
		// 				$.each(this, function(k, v) {
		// 					if(k == 'year')
		// 						r_year.push(v);
		// 					if(k == 'month')
		// 						r_month.push(v);
		// 					if(k == 'day')
		// 						r_day.push(v);
		// 					if(k == 'answer')
		// 						r_answer.push(v);
		// 					if(k == 'result')
		// 						r_result.push(v);
		// 				});
		// 			});

		// 			console.log(':'+r_month.length);
		// 			$.each(r_month, function(i, item) {
		// 				$('#first').append('<p class="r_date">'+r_year+' '+item+' '+r_day+'</p>\n');
		// 			});
		// 		}
		// 	});
		// }).change();
	}

	function box() {
		$('#sview').append('<div id="box-f"></div>');
		$('#box-f').append('<div class="box"><h4>DATES</h4><div id="first"></div></div>');
		// $('#box-f').append('<div class="box"><h4>USERS</h4><h6 id="h61"></h6><div id="second"></div></div>');
		// $('#box-f').append('<div class="box"><h4>PERIODS</h4><h6 id="h62"></h6><div id="third"></div></div>');
		// $('#view').append('<div class="bbox"><h4>EXERCISES</h4><h6 id="h63"></h6><div id="fourth"></div></div>');
	}

	searchUser();
	box();
	
	getUser();
}