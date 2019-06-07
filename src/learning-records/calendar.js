/* Calendar */
function calendar() {
	var d = new Date();
	var thisMonth = d.getMonth();

	var day = new Array();
		day[0] = "Monday";
		day[1] = "Tuesday";
		day[2] = "Wednesday";
		day[3] = "Thursday";
		day[4] = "Friday";
		day[5] = "Saturday";
		day[6] = "Sunday";

	var month = new Array();
		month[0] = "January";
		month[1] = "February";
		month[2] = "March";
		month[3] = "April";
		month[4] = "May";
		month[5] = "June";
		month[6] = "July";
		month[7] = "August";
		month[8] = "September";
		month[9] = "October";
		month[10] = "November";
		month[11] = "December";

	function titleCalendar() { $("#show #calendar").append('<div class="page-header"><h1>'+d.getFullYear()+' Calendar</h1></div>') };

	$('#show').empty();
	$('#show').append('<div id="calendar"></div>');

	/* functions */

	/* Display the search input field and call the getUsersList function */
	function searchUser() {
		var searchUser = '<div class="input-group col-xs-5">';
			searchUser += '<span class="input-group-addon">@</span>';
			searchUser += '<input type="text" id="getUser" class="form-control" placeholder="Type a nickname to see its progress">';
			searchUser += '</div>';
			searchUser += '<div class="error"></div><hr/>';

			getUsersList(thisMonth);

		$("#show #calendar").append(searchUser);
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
					// array of users get from Ajax call
					source: usersArray,
					// At least 3 characters to display the results
					minLength:3
				});

				usersDatas(getMonth);
			}
		});
	}

	/*
		parameter: getMonth - current month
		Display the results of the selected user in the calendar
	*/
	function usersDatas(getMonth) {
		$('#getUser').on('autocompletechange change', function() {
			var username = this.value;

			$.ajax({
				type:"GET",
				dataType:"json",
				url: "./src/learning-records/results.php?q="+username,
				success: function(userInfo) {
					var record = userInfo;
					var r_year = [], r_result = [];

					$.each(record.records, function() {
						$.each(this, function(k, v) {
							if(k == 'year')
								r_year.push(v);
							if(k == 'result')
								r_result.push(v);
						});
					});

					$('#calendar .calendar').hide();

					// console.log('r_result: '+r_result.length);
					gridCalendar(getMonth);

					// looping the results in the calendar
					$.each(r_year, function(i, item) {
						// if the month of the result equals the selected month
						if((item.substr(5,2)-1) == getMonth) {
							// the link who display the results
							var dis = '<p><a class="seer'+i+'">See the results</a></p>';

							// display the link
							$('#calendar .calendar #userdatas'+item.substr(8,2)).append(dis);

							// when clicking on the link, show an alert
							$('.seer'+i).click(function() {
								var al = 'Result: '+r_result[i];
								alert(al);
							});
						}
					});

				}
			});
		}).change();
	}

	/* Display all the months */
	function menuCalendar() {
		var menu = '<div id="menu" class="menu">';
			menu += '<button class="accordion">Months List</button>';
				menu += '<div id="lm" class="lig-month">';
				for(let i=0; i<12 ;i++) {
					if(i == thisMonth)
						menu += '<div id="chMonth'+i+'" class="col-month col-md-1 thistxt">'+month[i]+'</div>';
					else
						menu += '<div id="chMonth'+i+'" class="col-month col-md-1">'+month[i]+'</div>';
				}
				menu += '</div>';
			menu += '</div>';

		$("#show #calendar").append(menu);

		for(let i=0; i<12 ;i++) {
			$('#chMonth'+i).click(function() {
				$('#calendar .calendar').hide();
				$('#calendar .pagination').hide();

				pagination(i);
				
				if($('#getUser').length && $('#getUser').val() !== '')
					usersDatas(i);
				else
					gridCalendar(i);
			});
		}

		$('.lig-month').hide();

		$('.accordion').on('click', function() {
			if($(this).hasClass('active'))
				$(this).removeClass('active');
			else
				$(this).addClass('active');

			$('.lig-month').slideToggle('slow');
		});
	}

	/* 
		parameter: getMonth - current month
		Previous and next month
	*/
	function pagination(getMonth) {
		var pre = getMonth;

		var page = '<div id="pagination" class="row pagination">';
			page += '<div class="col-md-4 previous"><</div>';
			page += ' <span class="col-md-4 actual">'+month[pre]+'</span> ';
			page += '<div class="col-md-4 next">></div>';
			page += '</div>';

		$('#show #calendar').append(page);

		$('#pagination .previous').on('click', function() {
			if(pre > 0) {
				$('#pagination span').text(month[--pre]);

				$('#calendar .calendar').hide();

				if($('#getUser').length && $('#getUser').val() !== '')
					usersDatas(pre);
				else
					gridCalendar(pre);
				// console.log(pre);
			}
		});

		$('#pagination .next').on('click', function() {
			if(pre < 11) {
				$('#pagination span').text(month[++pre]);

				$('#calendar .calendar').hide();

				if($('#getUser').length && $('#getUser').val() !== '')
					usersDatas(pre);
				else
					gridCalendar(pre);
				// console.log(':'+pre);
			}
		});
	}

	/*
		parameter: getMonth - current month
		Display the calendar
	*/
	function gridCalendar(getMonth) {
		var n = 1;
		// get the number of the week-1 for a match with the loop count
		var thDay = d.getDay()-1;
		// get the day of the month
		var tdDay = d.getDate();
		// get the first day of the month from the parameter
		var firstDay = new Date(d.getFullYear(), getMonth, 1);
		// get the last day of the month from the parameter
		var lastDay = new Date(d.getFullYear(), getMonth+1, 0);
		// number of the week starts Sunday (0), so let's make it a 7
		var k = (firstDay.getDay() == 0) ? 7 : firstDay.getDay();

		// display the calendar as a table
		var	grid = '<table class="calendar"><thead><tr>';
			// first loop for columns from Monday to Sunday
			for(var i=0; i<7 ;i++) {
				// if it is the current day, make it red
				if(i == thDay && getMonth == thisMonth)
					grid += '<th scope="col" class="thistxt">'+day[i]+'</th>';
				else
					grid += '<th scope="col">'+day[i]+'</th>';
			}
			grid += '</tr></thead><tbody>';

			// second loop for the lines displaying the days from the 01 to 30/31
			for(var i=0; i<6 ;i++) {
				grid += '<tr>';
				/* first loop in a loop for the columns */
				for(var j=1; j<8 && n<=lastDay.getDate() ;j++) {
					if(j>=k) {
						// if it is the current day, make it red
						if(n == tdDay && getMonth == thisMonth)
							grid += '<td class="thisbg">';
						else
							grid += '<td>';
							grid += '<span class="nbday">'+n+'</span>';
							// add a div for the link to see the results
							grid += '<div id="userdatas'+n+'"></div>';
						grid += '</td>';
						n++;
					}
					else
						grid += '<td class="blank"></td>';
				}
				grid += '</tr>';
				k = 1;
			}
		grid += '</tbody></table>';

		$("#show #calendar").append(grid);
	}

	/* Function calls */

	titleCalendar();

	/*	The function searchUser() can display the datas of a specific user from an input
		Comment if not used
	*/
	// searchUser();

	menuCalendar();
	pagination(thisMonth);
	gridCalendar(thisMonth);
}