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
	$query = $_GET['q'];

	$arr = array();
	$min_length = 3;

	if(strlen($query) >= $min_length) {
		$raw_results = $bdd->query("SELECT * FROM learning_records WHERE nickName LIKE '%".$query."%'");

		if($raw_results->rowCount() > 0) {
			while($results = $raw_results->fetch())
				echo date("Y/m/d", strtotime($results['date']));
		}
		else
			echo "No results";
	}
	else
		echo 'error';
}
?>