/* List of Users:learning_records */
function userList() {
	var names = [], emails = [];

	$.ajax({
		type:"POST",
		dataType:"json",
		url: "./src/learning-records/results.php",
		success: function(data) {
			var show = data;

			$.each(show.users, function() {
				$.each(this, function(k, v) {
					if(k == 'name')
						names.push(v);
					if(k == 'email')
						emails.push(v);
				});
			});
		
			var table = '<table class="table table-striped table-paginate"><thead><tr>';
				table+= '<th scope="col">#</th><th scope="col">name</th><th scope="col">email</th>';
				table+= '</tr></thead><tbody>';

				$.each(names, function(i, item) {
					table += '<tr>';
						table += '<th scope="row">'+(i+1)+'</th>';
						table += '<td>'+item+'</td>';
						table += '<td>'+emails[i]+'</td>';
					table += '</tr>';
				});

			table += '</tbody></table>';

			$('#show #usersList').append(table);
			$('#show #usersList .table-paginate').dataTable();
			$('.loadingmessage').hide();
		}
	});
}