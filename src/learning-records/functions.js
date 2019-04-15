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
function searchUser() {
	var searchUser = '<div class="input-group col-xs-5">';
		searchUser += ' <span class="input-group-addon">@</span>';
		searchUser += '<input type="text" id="getUser" class="form-control" placeholder="Type a nickname and press Enter to see its progress">';
		searchUser += '</div>';
		searchUser += '<div class="error"></div><hr/>';

	$("#show #calendar").append(searchUser);
}

function getUser() {
	$('#getUser').on('input',function(e) {
		var username = $('#getUser').val();
		$.ajax({
			type:"GET",
			url: "./src/learning-records/results.php?q="+username,
			success: function (userInfo) {
				if(userInfo == 'error') {
					$("#calendar .calendar td #userdatas").empty();
					$(".error").text('Username must be at least 3 characters.');
				}
				else {
					$(".error").empty();
					$("#calendar .calendar td #userdatas").text(userInfo);
				}
			}
		});
	});
}

function menuCalendar(d) {
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

	var menu = '<div id="menu" class="menu">';
			menu += '<div id="lm" class="lig-month">';
			for(let i=0; i<12 ;i++) {
				if(i == d.getMonth())
					menu += '<div id="chMonth'+i+'" class="col-month col-md-1 thistxt thisbg">'+month[i]+'</div>';
				else
					menu += '<div id="chMonth'+i+'" class="col-month col-md-1">'+month[i]+'</div>';
			}
			menu += '</div>';
		menu += '</div>';

	$("#show #calendar").append(menu);

	var newMonth;

	for(let i=0; i<12 ;i++) {
		$('#chMonth'+i).click(function(){
			$('#calendar .calendar').hide();
			gridCalendar(d,i);
		});
	}
}

function gridCalendar(d,getMonth) {
	var day = new Array();
		day[0] = "Monday";
		day[1] = "Tuesday";
		day[2] = "Wednesday";
		day[3] = "Thursday";
		day[4] = "Friday";
		day[5] = "Saturday";
		day[6] = "Sunday";

	var n = 1;
	var thDay = d.getDay()-1;
	var tdDay = d.getDate();

	var firstDay = new Date(d.getFullYear(), getMonth, 1);
	var lastDay = new Date(d.getFullYear(), getMonth+1, 0);
	var k = (firstDay.getDay() == 0) ? 7 : firstDay.getDay();

	var	grid = '<table class="calendar"><thead><tr>';
		for(var i=0; i<7 ;i++) {
			if(i == thDay && getMonth == d.getMonth())
				grid += '<th scope="col" class="thistxt">'+day[i]+'</th>';
			else
				grid += '<th scope="col">'+day[i]+'</th>';
		}
		grid += '</tr></thead><tbody>';

		console.log(k);
		for(var i=0; i<6 ;i++) {
			grid += '<tr>';
			for(var j=1; j<8 && n<=lastDay.getDate() ;j++) {
				if(j>=k) {
					if(n == tdDay && getMonth == d.getMonth())
						grid += '<td class="thisbg">';
					else
						grid += '<td>';

					grid += '<span class="nbday">'+n+'</span>';
					
					grid += '<div id="userdatas">';
						getUser();
					grid += '</div>';

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

function calendar() {
	var d = new Date();

	function titleCalendar() { $("#show > #calendar").append('<h1>'+d.getFullYear()+' Calendar</h1>') };

	$('#show').empty();
	$('#show').append('<div id="calendar"></div>');

	searchUser();
	titleCalendar();

	menuCalendar(d);
	gridCalendar(d,d.getMonth());
}