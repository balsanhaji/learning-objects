/******************************************************************************
 Data Structures E-Learning Power
 Ciprian-Bogdan Chirila
 chirila@cs.upt.ro
 http://www.cs.upt.ro/~chirila
 date: 01.03.2019
******************************************************************************/

/*---------------------------------------------------------------------------*/

function LearningRecords()
{
	console.log("LearningRecords.LearningRecords");
}

/*---------------------------------------------------------------------------*/

LearningRecords.prototype.create=function(tableOfSymbols,question,answer,feedback,result)
{
	console.log("LearningRecords.create");
		
	console.log(tableOfSymbols);
	console.log(question);
	console.log(feedback);
	
	question="test";
	feedback="test";
	
	$.ajax(
	{
		url: "./src/learning-records/LearningRecords.php?"+"create=1"+
		"&name="+app.session.name+
		"&firstName="+app.session.firstName+
		"&lastName="+app.session.lastName+
		"&nickName="+app.session.nickName+
		"&email="+app.session.email+
		"&loginMethod="+app.session.loginMethod+
		"&tableOfSymbols="+tableOfSymbols+
		"&question="+question+
		"&answer="+answer+
		"&feedback="+feedback+
		"&result="+result,
		beforeSend : function(xhr)
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data)
	{
		console.log(data);
	});
};

/*---------------------------------------------------------------------------*/
