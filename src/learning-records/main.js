import Calendar from './pooCalendar.js';
// import userList from './userslist.js';
import usersList from './userslist.js';

$(function() {
	homeDefault();

	/* Links */
	$(".navbar-nav li:first a").click(function() {
		$('#header').hide();
		$('#calendar').hide();
		homeDefault();
	});
	
	$(".navbar-nav li:nth-child(2) a").click(function() {
		var list = new usersList();

		$('#show').hide();
		$('#header *').empty();
		$('#header').show();

		$('#header h1').text('Users List');
		$('#header #article').html(list.displayList());
	});
	
	$(".navbar-nav li:nth-child(3) ul li:first a").click(function() {
		var cal = new Calendar();

		$('#show').hide();
		$('#header').show();

		$('#header h1').text('2019 Calendar');
		// $('#header #article').text(cal.getDayName()[2]);
		$('#header #article').text(cal.getThisMonth());
	});

	$(".navbar-nav li:nth-child(3) ul li:nth-child(2) a").click(function() {
		$('#show').empty();
		$('#show').show();
	});
	
	$(".navbar-nav li:nth-child(4) a").click(function() {
		function titleTeacher() { $("#show #teacher").append('<h1>Teacher view</h1>') };

		$('#show').empty();
		$('#show').append('<div id="teacher"></div>');
		
		titleTeacher();

		$('#show #teacher').append(nick.getResults());
	});
});


/*  */
function homeDefault() {
	var header = '<div class="page-header"><h1>Track student progress</h1></div><p>Use the menu to access informations.</p>';
	$("#show").show();
	$("#show").html(header);
}