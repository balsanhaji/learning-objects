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

			getUsersList(thisMonth);

		$("#show #sview").append(searchUser);
	}

	/*
		parameter: getMonth - current month
		Display the users list with the autocomplete function and call the usersDatas function
	*/
	function getUsersList(getMonth) {
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

				usersDatas(getMonth);
			}
		});
	}

	searchUser();
}