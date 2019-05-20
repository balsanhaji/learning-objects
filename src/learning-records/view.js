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
						periodList(d,$(this).text());
					});
				});
			}
		});
	}

	/*
		periodList
	*/
	function periodList(d,u) {
		console.log('?'+u);

		var choose = '<p class="r_period"><input type="radio" id="per0" name="per" value="0"> By day</p>\n';
			choose+= '<p class="r_period"><input type="radio" id="per1" name="per" value="1"> By week</p>\n';
			choose+= '<p class="r_period"><input type="radio" id="per2" name="per" value="2"> By month</p>\n';

		$('#third').html(choose);

		$('.r_period').click(function() {
			if($('#per0').is(':checked'))
				exercises('1');
			if($('#per1').is(':checked'))
				exercises(7,d,u);
			if($('#per2').is(':checked'))
				exercises('3');
		});
	}

	/*
		exercises
	*/
	function exercises(n,d,u) {
		$('#fourth').html('<div class="chart-container"><canvas id="myChart"></canvas></div>\n');
		
		let curr = new Date(d);
		let week = [];

		console.log(':'+n);
		for(let i = 1; i <= n; i++) {
			let first = (curr.getDay() == 0) ? curr.getDate() - 6 : curr.getDate() - curr.getDay() + i;
			let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
			week.push(day);
		}

		console.log(d+':'+d.substr(8, 2)+':'+week[week.length-1]);
		$.ajax({
			type:"GET",
			dataType:"json",
			url: "./src/learning-records/results.php?q=teacher&u="+u+"&da="+week[0]+"&db="+week[week.length-1],
			success: function(results) {
				var res = results;
				console.log(res);
				var val = [];

				$.each(res.results, function() {
					$.each(this, function(k, v) {
						if(k == 'result')
							val.push(v);
					});
				});

				var ctx = $('#myChart');
				var myChart = new Chart(ctx, {
					type: 'bar',
					data: {
						labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Gray'],
						datasets: [{
							label: 'Progress '+week[0]+' from to '+week[week.length-1],
							data: [val[0], val[1], val[2], val[3], val[4], val[5], val[6]],
							backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)',
							'rgba(128, 128, 128, 0.2)'
							],
							borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)',
							'rgba(128, 128, 128, 1)'
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
		});
	}

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