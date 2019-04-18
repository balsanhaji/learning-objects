<?php
/* PDO MySQL Connection */
try {
	$bdd = new PDO('mysql:host=localhost;dbname=dsel_db;charset=utf8', 'dsel_user', '#2019dsel@cs.upt.ro');
}
catch(Exception $e) {
	die('Erreur : '.$e->getMessage());
}

/* If sending or receiving datas */
if(!isset($_GET['q'])) {
	/* Sending datas to Ajax method : POST request */
	$i = 1;

	/* Users list default SQL request */
	$req = $bdd->query("SELECT DISTINCT nickName FROM learning_records");

	/* JSON Encoding */
	echo '{"users":[ ';
		while($datas = $req->fetch()) {
			echo '{"id": '.$i.',';
			echo '"nickName": "'.$datas['nickName'].'"}';

			if($i < $req->rowCount())
				echo ',';

			$i++;
		}
	echo ']}';

	/* Closing connection */
	$req->closeCursor();
}
else {
	/* Receiving username from Ajax method : GET request */
	$username = $_GET['q'];
	$i = 1;

	/* User specific datas SQL request */
	$raw_results = $bdd->query("SELECT * FROM learning_records WHERE nickName LIKE '".$username."'");

	/* If user exists */
	if($raw_results->rowCount() > 0) {
		/* JSON Encoding */
		echo '{"records":[ ';
			while($results = $raw_results->fetch()) {
				echo '{"year": '.date("Y", strtotime($results['date'])).',';
				echo '"day": '.date("j", strtotime($results['date'])).',';
				echo '"month": '.date("n", strtotime($results['date'])).',';
				echo '"answer": "'.$results['answer'].'",';
				echo '"result": '.$results['result'].'}';

				if($i < $raw_results->rowCount())
					echo ',';

				$i++;
			}
		echo ']}';
	}

	/* Closing connection */
	$raw_results->closeCursor();
}
?>