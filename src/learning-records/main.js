$(function() {
	homeDefault();

	/* Links */
	$(".navbar-nav li:first a").click(function() {
		$(".navbar-nav li").removeClass("active");
		$(".navbar-nav li:first").addClass("active");
		homeDefault();
	});
	$(".navbar-nav li:nth-child(2) a").click(function() {
		$(".navbar-nav li").removeClass("active");
		$(".navbar-nav li:nth-child(2)").addClass("active");
		$('#show').empty();
		$('#show').append('<div id="usersList"><div class="loadingmessage"> </div></div>');
		$('.loadingmessage').show();
		userList();
	});
	$(".navbar-nav li:nth-child(3) a").click(function() {
		$(".navbar-nav li").removeClass("active");
		$(".navbar-nav li:nth-child(3)").addClass("active");
		calendar();
	});
	$(".navbar-nav li:nth-child(4) ul li:first a").click(function() {
		$(".navbar-nav li").removeClass("active");
		$(".navbar-nav li:nth-child(4)").addClass("active");
		view();
	});
	$(".navbar-nav li:nth-child(4) ul li:nth-child(2) a").click(function() {
		$(".navbar-nav li").removeClass("active");
		$(".navbar-nav li:nth-child(4)").addClass("active");
		sview();
	});
});


/*  */
function homeDefault() {
	var header = '<div class="page-header"><h1>Track student progress</h1></div><p>Use the menu to access informations.</p>';
	$("#show").empty();
	$("#show").append(header);
}