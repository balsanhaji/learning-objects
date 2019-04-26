/* List of Users:learning_records */
// function userList() {
// 	var names = [], emails = [];

// 	$.ajax({
// 		type:"POST",
// 		dataType:"json",
// 		url: "./src/learning-records/results.php",
// 		success: function(data) {
// 			var show = data;

// 			$.each(show.users, function() {
// 				$.each(this, function(k, v) {
// 					if(k == 'name')
// 						names.push(v);
// 					if(k == 'email')
// 						emails.push(v);
// 				});
// 			});
		
// 			var table = '<table class="table table-striped table-paginate"><thead><tr><th scope="col">#</th><th scope="col">name</th><th scope="col">email</th></tr></thead><tbody>';

// 				$.each(names, function(i, item) {
// 					table += '<tr>';
// 						table += '<th scope="row">'+(i+1)+'</th>';
// 						table += '<td>'+item+'</td>';
// 						table += '<td>'+emails[i]+'</td>';
// 					table += '</tr>';
// 				});

// 			table += '</tbody></table>';

// 			$('#usersList').append(table);
// 			$('#usersList .table-paginate').dataTable();
// 			$('#usersList .loadingmessage').hide();
// 		}
// 	});
// }

export default class usersList {
	constructor() {
		this.names	= [];
		this.emails = [];
	}

	getDate() {
		return new Date();
	}

	getList() {
		var name = this.names;
		var email = this.emails;

		$.ajax({
			type:"POST",
			dataType:"json",
			url: "./src/learning-records/results.php",
			success: function(data) {
				console.log(data.users);
				$.each(data.users, function() {
					$.each(this, function(k, v) {
						if(k == 'name')
							name.push(v);
						if(k == 'email')
							email.push(v);
					});
				});

				this.names = name;
				this.emails = email;
			}
		});
	}

	displayList() {
		this.getList();
		
		l_name= this.names;
		console.log(l_name.length);
		var l_email= this.emails;
		var list= [];

		$.each(l_name, function(i, item) {
			list.push('<p>'+item+' - '+l_email[i]+'</p>');
		});
	
		console.log(list.length);
		return list;
	}
}