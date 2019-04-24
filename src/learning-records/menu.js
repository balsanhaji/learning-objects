$(function() {
	homeDefault();

	/* Links */
	$(".navbar-nav li:first a").click(function() {
			homeDefault();
	});
	$(".navbar-nav li:nth-child(2) a").click(function() {
			$('#show').empty();
			$('#show').append('<div id="usersList"><div class="loadingmessage"> </div></div>');
			$('.loadingmessage').show();
			userList();
	});
	$(".navbar-nav li:nth-child(3) ul li:first a").click(function() {
			calendar();
	});
	$(".navbar-nav li:nth-child(3) ul li:nth-child(2) a").click(function() {
			$('#show').empty();
			$('#show').show();
	});
});


/*  */
function homeDefault() {
	var header = '<div class="page-header"><h1>Track student progress</h1></div><p>Use the menu to access informations.</p>';
	$("#show").empty();
	$("#show").append(header);
}