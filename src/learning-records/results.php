<?php
/* PDO MySQL Connection */
try {
	$bdd = new PDO('mysql:host=localhost;dbname=dsel_db;charset=utf8', 'dsel_user', '#2019dsel@cs.upt.ro');
}
catch(Exception $e) {
	die('Erreur : '.$e->getMessage());
}

$q = ($_SERVER['QUERY_STRING']) ? $_GET['q'] : null;

/* If sending or receiving datas */
if($q == null) {
	/* Sending datas to Ajax method : POST request */
	$i = 1;

	/* Users list default SQL request */
	$req = $bdd->query("SELECT name, email FROM learning_records");

	/* JSON Encoding */
	echo '{"users":[ ';
		while($datas = $req->fetch()) {
			echo '{"name": "'.$datas['name'].'",';
			echo '"email": "'.$datas['email'].'"}';

			if($i < $req->rowCount())
				echo ',';

			$i++;
		}
	echo ']}';

	/* Closing connection */
	$req->closeCursor();
}
else {
	if($q != 'teacher') {
		/* Receiving username from Ajax method : GET request */
		$username = $q;
		$i = 1;

		/* User specific datas SQL request */
		$raw_results = $bdd->query("SELECT name, `date`, answer, result FROM learning_records WHERE name LIKE '".$username."'");

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

	if($q == 'teacher') {
		if(isset($_GET['d'])) {
			$d = $_GET['d'];
			$i = 1;

			/* User specific datas SQL request */
			$raw_results = $bdd->query("SELECT DISTINCT name FROM learning_records WHERE CAST(`date` AS date) = '".$d."' ORDER BY name ASC");

			if($raw_results->rowCount() > 0) {
				/* JSON Encoding */
				echo '{"users":[ ';
					while($results = $raw_results->fetch()) {
						echo '{"user": "'.$results[0].'"}';

						if($i < $raw_results->rowCount())
							echo ',';

						$i++;
					}
				echo ']}';
			}

			/* Closing connection */
			$raw_results->closeCursor();
		}
		else if(isset($_GET['u']) AND isset($_GET['da']) AND isset($_GET['db'])) {
			$user = $_GET['u'];
			$da = $_GET['da'];
			$db = $_GET['db'];
			$i = 1;

			/* User specific datas SQL request */
			$raw_results = $bdd->query("SELECT result FROM learning_records WHERE (CAST(`date` AS date) BETWEEN '".$da."' AND '".$db."') AND name = '".$user."'");

			if($raw_results->rowCount() > 0) {
				/* JSON Encoding */
				echo '{"results":[ ';
					while($results = $raw_results->fetch()) {
						echo '{"result": "'.$results[0].'"}';

						if($i < $raw_results->rowCount())
							echo ',';

						$i++;
					}
				echo ']}';
			}

			/* Closing connection */
			$raw_results->closeCursor();
		}
		else {
			$i = 1;

			/* User specific datas SQL request */
			$raw_results = $bdd->query("SELECT DISTINCT CAST(`date` AS date) FROM learning_records ORDER BY CAST(`date` AS date) ASC");

			if($raw_results->rowCount() > 0) {
				/* JSON Encoding */
				echo '{"dates":[ ';
					while($results = $raw_results->fetch()) {
						echo '{"date": "'.$results[0].'"}';

						if($i < $raw_results->rowCount())
							echo ',';

						$i++;
					}
				echo ']}';
			}

			/* Closing connection */
			$raw_results->closeCursor();
		}
	}	
}
?>