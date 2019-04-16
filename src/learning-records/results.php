<?php
try {
	$bdd = new PDO('mysql:host=localhost;dbname=dsel_db;charset=utf8', 'dsel_user', '#2019dsel@cs.upt.ro');
}
catch(Exception $e) {
	die('Erreur : '.$e->getMessage());
}

if(!isset($_GET['q'])) {
	$i = 1;

	$req = $bdd->query("SELECT DISTINCT nickName FROM learning_records");

	echo '{"users":[ ';
		while($datas = $req->fetch()) {
			echo '{"id": '.$i.',';
			echo '"nickName": "'.$datas['nickName'].'"}';

			if($i < $req->rowCount())
				echo ',';

			$i++;
		}
	echo ']}';

	$req->closeCursor();
}
else {
	$username = $_GET['q'];
	$i = 1;

	$raw_results = $bdd->query("SELECT * FROM learning_records WHERE nickName LIKE '".$username."'");

	if($raw_results->rowCount() > 0) {
		echo '{"records":[ ';
			while($results = $raw_results->fetch()) {
				// echo '{"year": '.date("Y", strtotime($results['date'])).',';
				echo '{"day": '.date("j", strtotime($results['date'])).',';
				echo '"month": '.date("n", strtotime($results['date'])).'}';

				if($i < $raw_results->rowCount())
					echo ',';

				$i++;
			}
		echo ']}';
	}
}
?>