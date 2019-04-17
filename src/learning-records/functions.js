/* List of Users:learning_records */
function userList() {
	$('#show').empty();
	$('#show').append('<div id="usersList"></div>');

	$.ajax({
		url: "./src/learning-records/results.php",
		beforeSend: function(xhr) {
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		},
		success: function(data) {
			var table = '<table class="table table-striped"><thead><tr><th scope="col">#</th><th scope="col">nickName</th></tr></thead><tbody>';
			var show = JSON.parse(data);
			
			$.each(show.users, function() {
				table += '<tr>';
				
				$.each(this, function(k, v) {
					if(k == 'id')
						table += '<th scope="row">'+v+'</th>';
					else
						table += '<td>'+v+'</td>';
				});
				
				table += '</tr>';
			});
			table += '</tbody></table>';

			$('#show #usersList').append(table);
		}
	});
}

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

	function titleCalendar() { $("#show #calendar").append('<h1>'+d.getFullYear()+' Calendar</h1>') };

	$('#show').empty();
	$('#show').append('<div id="calendar"></div>');

	/* functions */

	function searchUser() {
		var searchUser = '<div class="input-group col-xs-5">';
			searchUser += '<span class="input-group-addon">@</span>';
			searchUser += '<input type="text" id="getUser" class="form-control" placeholder="Type a nickname to see its progress">';
			searchUser += '</div>';
			searchUser += '<div class="error"></div><hr/>';

		getUsersList(thisMonth);

		$("#show #calendar").append(searchUser);
	}

	function getUsersList(getMonth) {
		$.ajax({
			url: "./src/learning-records/results.php",
			beforeSend: function(xhr) {
				xhr.overrideMimeType("text/plain; charset=x-user-defined");
			},
			success: function(userList) {
				var show = JSON.parse(userList);
				var usersArray = new Array();

				$.each(show.users, function() {				
					$.each(this, function(k, v) {
						if(k == 'nickName')
							usersArray.push(v);
					});
				});

				$('#getUser').autocomplete({
					source: usersArray
				});

				usersDatas(getMonth);
			}
		});
	}

	function usersDatas(getMonth) {
		$('#getUser').on('autocompletechange change', function() {
			var username = this.value;

			$.ajax({
				type:"GET",
				dataType:"json",
				url: "./src/learning-records/results.php?q="+username,
				success: function(userInfo) {
					var record = userInfo;
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

					$('#calendar .calendar').hide();
					
					console.log('r_result: '+r_result.length);
					gridCalendar(getMonth);
					$.each(r_month, function(i, item) {
						if((item-1) == getMonth) {
							// for(var j=0; j < r_result.length; j++) {
								var dis = '<p><a class="seer'+i+'">See the results</a></p>';
								$('#calendar .calendar #userdatas'+r_day[i]).append(dis);
								console.log('i'+i);
								$('.seer'+i).click(function() {
									var al = 'Result: '+r_result[i]+'\n\nAnswer: \n'+r_answer[i];
									alert(al);
								});
							// }
						}
					});
				}
			});
		}).change();
	}

	function menuCalendar() {
		var menu = '<div id="menu" class="menu">';
				menu += '<div id="lm" class="lig-month">';
				for(let i=0; i<12 ;i++) {
					if(i == thisMonth)
						menu += '<div id="chMonth'+i+'" class="col-month col-md-1 thistxt thisbg">'+month[i]+'</div>';
					else
						menu += '<div id="chMonth'+i+'" class="col-month col-md-1">'+month[i]+'</div>';
				}
				menu += '</div>';
			menu += '</div>';

		$("#show #calendar").append(menu);

		for(let i=0; i<12 ;i++) {
			$('#chMonth'+i).click(function() {
				$('#calendar .calendar').hide();

				if($('#getUser').val() === '')
					gridCalendar(i);
				else
					usersDatas(i);
			});
		}
	}

	function gridCalendar(getMonth) {
		var n = 1;
		var thDay = d.getDay()-1;
		var tdDay = d.getDate();

		var firstDay = new Date(d.getFullYear(), getMonth, 1);
		var lastDay = new Date(d.getFullYear(), getMonth+1, 0);
		var k = (firstDay.getDay() == 0) ? 7 : firstDay.getDay();

		var	grid = '<table class="calendar"><thead><tr>';
			for(var i=0; i<7 ;i++) {
				if(i == thDay && getMonth == thisMonth)
					grid += '<th scope="col" class="thistxt">'+day[i]+'</th>';
				else
					grid += '<th scope="col">'+day[i]+'</th>';
			}
			grid += '</tr></thead><tbody>';

			// console.log(k);
			for(var i=0; i<6 ;i++) {
				grid += '<tr>';
				for(var j=1; j<8 && n<=lastDay.getDate() ;j++) {
					if(j>=k) {
						if(n == tdDay && getMonth == thisMonth)
							grid += '<td class="thisbg">';
						else
							grid += '<td>';
							grid += '<span class="nbday">'+n+'</span>';
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

	searchUser();
	titleCalendar();

	menuCalendar();
	gridCalendar(thisMonth);
}