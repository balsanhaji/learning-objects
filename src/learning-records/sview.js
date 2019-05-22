/* Student view */
function sview() {
	function titleView() { $("#show #sview").append('<div class="page-header"><h1>Student view</h1></div>') };

	$('#show').empty();
	$('#show').append('<div id="sview"></div>');
	titleView();

	/*
		datesList
	*/
	function testList() {
		var username = 'lillian.vaughan12089';

		console.log(username);
		$.ajax({
			type:"GET",
			dataType:"json",
			url: "./src/learning-records/results.php?q="+username,
			success: function(res) {
				var ui = res;
				var r_date = [], r_result = [];
				
				console.log(ui);
				$.each(ui.records, function() {
					$.each(this, function(k, v) {
						if(k == 'year')
							r_date.push(v);
						if(k == 'result')
							r_result.push(v);
					});
				});

				$.each(r_date, function(i, item) {
					$('#first').append('<p class="r_date">'+item+'</p>\n');
				});


				$(".r_date").each(function(index) {
					$(this).on("click", function() {
						exercises(7,$(this).text(),username);
					});
				});
			}
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
						labels: [week[0], week[1], week[2], week[3], week[4], week[5], week[week.length-1]],
						datasets: [{
							label: 'Progress '+week[0]+' from to '+week[week.length-1],
							data: [val[0], val[1], val[2], val[3], val[4], val[5], val[val.length-1]],
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
		$('#sview').append('<div id="box-f"></div>');
		$('#box-f').append('<div class="box"><h4>DATES</h4><h6 id="h64"></h6><div id="first"></div></div>');
		$('#sview').append('<div class="bbox"><h4>EXERCISES</h4><h6 id="h63"></h6><div id="fourth"></div></div>');
	}

	box();
	
	testList();
}