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

				// console.log(r_dates.length);
			}
		});
	}

	/*
		usersList
	*/
	function usersList(date) {
		// console.log('?'+d);

		$.ajax({
			type:"GET",
			dataType:"json",
			url: "./src/learning-records/results.php?q=teacher&d="+date,
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
						periodList(date,$(this).text());
					});
				});
			}
		});
	}

	/*
		periodList
	*/
	function periodList(date,user) {
		// console.log('?'+u);

		var choose = '<p class="r_period"><input type="radio" id="per0" name="per" value="0"> By day</p>\n';
			choose+= '<p class="r_period"><input type="radio" id="per1" name="per" value="1"> By week</p>\n';
			choose+= '<p class="r_period"><input type="radio" id="per2" name="per" value="2"> By month</p>\n';

		$('#third').html(choose);

		$('.r_period').click(function() {
			if($('#per0').is(':checked'))
				exercises(0,date,user);
			if($('#per1').is(':checked'))
				exercises(1,date,user);
			if($('#per2').is(':checked'))
				exercises(2,date,user);
		});
	}

	/*
		exercises
	*/
	function exercises(view,date,user) {
		$('#fourth').html('<div class="chart-container"><canvas id="myChart"></canvas></div>\n');
		
		// console.log(date);
		let d = new Date(date);
		let lastDay = new Date(d.getFullYear(), d.getMonth()+1, 0);
		let gap = [];


		if(view == 0)
			gap.push(date);
		if(view == 1) {
			for(let i = 1; i <= 7; i++) {
				let first = (d.getDay() == 0) ? d.getDate() - 6 : d.getDate() - d.getDay() + i;
				let day = new Date(d.setDate(first)).toISOString().slice(0, 10);
				gap.push(day);
			}
		}
		if(view == 2) {
			for(let i = 1; i <= lastDay.getDate(); i++) {
				let day = (i < 10) ? '0'+i : i;
				gap.push(d.getFullYear()+'-'+date.substr(5,2)+'-'+day);
			}
		}

		// console.log(date.substr(5, 2));
		console.log(gap);
		// console.log(d+':'+d.substr(8, 2)+':'+week[week.length-1]);
		$.ajax({
			type:"GET",
			dataType:"json",
			url: "./src/learning-records/results.php?q=teacher&u="+user+"&da="+gap[0]+"&db="+gap[gap.length-1],
			success: function(results) {
				var res = results;
				// console.log(res);
				var rt_date = [], r_date = [], rt_val = [], r_val = [];
				var num = 0;

				for(let i=0; i<gap.length; i++) {
					r_date[i] = 0;
					r_val[i] = 0;
				}

				if(gap.length > 1) {
					$.each(res.results, function() {
						$.each(this, function(k, v) {
							if(k == 'year') {
								for(let i=0; i<gap.length; i++) {
									r_date[i] = gap[i];
									if(v == gap[i]) {
										num = i;
									}
								}
							}
							if(k == 'result')
								r_val[num] = v;
						});
					});
				}

				if(gap.length == 1) {
					$.each(res.results, function() {
						$.each(this, function(k, v) {
							if(k == 'result') {
								r_date[num] = v;
								r_val[num] = v;
								num++;
							}
						});
					});
				}

				// console.log(week);
				console.log(r_date);
				// console.log(r_val);

				function getRandomColor() {
					var letters = '0123456789ABCDEF', color = '#';
					for(var i = 0; i < 6; i++)
						color += letters[Math.floor(Math.random() * 16)];

					return color;
				}

				var label = [], datas = [];
				var bgColor = [], bdColor = [];

				for(let i=0; i<r_date.length; i++) {
					label.push(r_date[i]);
					bgColor.push(getRandomColor());
					bdColor.push(getRandomColor());
				}

				// console.log(label);
				// console.log(datas);
				// console.log(bgColor);

				var ctx = $('#myChart');
				var myChart = new Chart(ctx, {
					type: 'bar',
					data: {
						labels: label,
						datasets: [{
							label: 'Progress '+gap[0]+' from to '+gap[gap.length-1],
							data: r_val,
							backgroundColor: bgColor,
							borderColor: bdColor,
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