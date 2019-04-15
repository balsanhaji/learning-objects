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

function getUserList() {
	$.ajax({
		url: "./src/learning-records/results.php",
		beforeSend: function(xhr) {
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		},
		success: function(data) {
			var show = JSON.parse(data);
			var usersArray = new Array();

			$.each(show.users, function() {				
				$.each(this, function(k, v) {
					if(k == 'nickName')
						usersArray.push(v);
				});
			});

			console.log(usersArray);
			autocomplete(document.getElementById("getUser"), usersArray);
		}
	});
}

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
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
						getUserList();
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