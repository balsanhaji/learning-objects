<?php
try {
	$bdd = new PDO('mysql:host=localhost;dbname=dsel_db;charset=utf8', 'dsel_user', '#2019dsel@cs.upt.ro');
}
catch(Exception $e) {
	die('Erreur : '.$e->getMessage());
}

$i = 1;

$req = $bdd->query("SELECT DISTINCT nickName FROM learning_records");

echo '{"users":[ ';
	while($datas = $req->fetch()) {
		echo '{"id": '.$i.',';
		
		if($i == $req->rowCount())
			echo '"nickName": "'.$datas['nickName'].'"}';
		else
			echo '"nickName": "'.$datas['nickName'].'"},';

		$i++;
	}
echo ']}';


$req->closeCursor();
?>