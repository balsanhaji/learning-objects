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
		var username = 'julia.jones15150';

		// console.log(username);
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

				// console.log(':'+r_month.length);

				$('#h64').html(username);
				$.each(r_month, function(i, item) {
					$('#first').append('<p class="r_date">'+r_year+' '+item+' '+r_day+'</p>\n');
				});

				$('.r_date').click(function() {
					exercises('1');
				});
			}
		});
	}

	/*
		exercises
	*/
	function exercises(n) {
		$('#fourth').html('<div class="chart-container"><canvas id="myChart"></canvas></div>\n');
	
		var ctx = $('#myChart');
		var myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: ['Orange'],
				datasets: [{
					label: 'Progress',
					data: [3],
					backgroundColor: [
						'rgba(255, 159, 64, 0.2)'
					],
					borderColor: [
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

	function box() {
		$('#sview').append('<div id="box-f"></div>');
		$('#box-f').append('<div class="box"><h4>DATES</h4><h6 id="h64"></h6><div id="first"></div></div>');
		$('#sview').append('<div class="bbox"><h4>EXERCISES</h4><h6 id="h63"></h6><div id="fourth"></div></div>');
	}

	box();
	
	testList();
}