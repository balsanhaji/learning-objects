export default class user {
	constructor(name, notes, dates) {
		this.name = name;
		this.notes = notes;
		this.dates = dates;
	}

	getName() {
		return `${name}`;
	}
	
	getResults() {
		var results = '';
		$.each(notes, function(i, item) {
			results += `<p>${item} - ${dates[i]}</p>`;
		});

		return results;
	}

	addResult(i,j) {
		notes.push(i);
		dates.push(j);
	}
}


var notes = [];
var dates = [];

const nick	= new user("nick", notes, dates);

nick.addResult(10,'2019-04-22 13:35:07');
nick.addResult(10,'2019-04-23 07:55:08');

console.log(nick.getResults());
