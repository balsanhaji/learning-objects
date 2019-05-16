function view() {
	function titleView() { $("#show #view").append('<div class="page-header"><h1>Teacher view</h1></div>') };

	$('#show').empty();
	$('#show').append('<div id="view"></div>');
	titleView();

	/*
		datesList
	*/
	function datesList() {
		if($("#h61").is(':empty')) {
			$("#h61").html('Choose a date');
		}
		
		if($("#h62").is(':empty')) {
			$("#h62").html('Choose an user');
		}

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

				$.each(r_dates, function(i, item) {
					$('#first').append('<p class="r_date">'+item+'</p>\n');
				});


				$(".r_date").each(function(index) {
					$(this).on("click", function() {
						$('#h61').html($(this).text());
						usersList($(this).text());
					});
				});

				console.log(r_dates.length);
			}
		});
	}

	/*
		usersList
	*/
	function usersList(d) {
		console.log('?'+d);

		$.ajax({
			type:"GET",
			dataType:"json",
			url: "./src/learning-records/results.php?q=teacher&d="+d,
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
				$('#second p').remove();
				$.each(r_users, function(i, item) {
					$('#second').append('<p class="r_user">'+item+'</p>\n');
				});

				$(".r_user").each(function(index) {
					$(this).on("click", function() {
						$('#h62').html($(this).text());
						periodList($(this).text());
					});
				});
			}
		});
	}

	/*
		periodList
	*/
	function periodList(u) {
		console.log('?'+u);

		var choose = '<p class="r_period"><input type="radio" id="per0" name="per" value="0"> By day</p>\n';
			choose+= '<p class="r_period"><input type="radio" id="per1" name="per" value="1"> By week</p>\n';
			choose+= '<p class="r_period"><input type="radio" id="per2" name="per" value="2"> By month</p>\n';

		$('#third').html(choose);

		$('.r_period').click(function() {
			if($('#per0').is(':checked'))
				exercises('1');
			if($('#per1').is(':checked'))
				exercises('2');
			if($('#per2').is(':checked'))
				exercises('3');
		});
	}

	/*
		exercises
	*/
	function exercises(n) {
		$('#fourth').html(n+'<div class="chart-container"><canvas id="myChart"></canvas></div>\n');
	
		var ctx = $('#myChart');
		var myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
				datasets: [{
					label: '# of Votes',
					data: [12, 19, 3, 5, 2, 3],
					backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
					],
					borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
					],
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				}
			}
		});
	}


		// $.ajax({
		// 	type:"GET",
		// 	dataType:"json",
		// 	url: "./src/learning-records/results.php?q=teacher&d="+u,
		// 	success: function(period) {
		// 		// console.log(dates);
		// 		var lperiod = period;
		// 		var r_period = [];

		// 		// console.log(ldates);
		// 		$.each(lperiod.period, function() {
		// 			$.each(this, function(k, v) {
		// 				if(k == 'period')
		// 					r_period.push(v);
		// 			});
		// 		});
				
		// 		// console.log(r_dates);
		// 		$('#third p').remove();
		// 		$.each(r_period, function(i, item) {
		// 			$('#third').append('<p class="r_period"><input type="checkbox" name="day" value="By day"></p>\n');
		// 			$('#third').append('<p class="r_period"><input type="checkbox" name="week" value="By week"></p>\n');
		// 			$('#third').append('<p class="r_period"><input type="checkbox" name="month" value="By month"></p>\n');
		// 		});

		// 		$(".r_period").each(function(index) {
		// 			$(this).on("click", function() {
		// 				$('#h63').html($(this).text());
		// 				usersList($(this).text());
		// 			});
		// 		});
		// 	}
		// });


	function box() {
		$('#view').append('<div id="box-f"></div>');
		$('#box-f').append('<div class="box"><h4>DATES</h4><div id="first"></div></div>');
		$('#box-f').append('<div class="box"><h4>USERS</h4><h6 id="h61"></h6><div id="second"></div></div>');
		$('#box-f').append('<div class="box"><h4>PERIODS</h4><h6 id="h62"></h6><div id="third"></div></div>');
		$('#view').append('<div class="bbox"><h4>EXERCISES</h4><h6 id="h63"></h6><div id="fourth"></div></div>');
	}

	box();
	datesList();
}