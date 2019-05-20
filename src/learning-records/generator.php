<?php
/* PDO MySQL Connection */
try {
	$bdd = new PDO('mysql:host=localhost;dbname=dsel_db;charset=utf8', 'dsel_user', '#2019dsel@cs.upt.ro');
}
catch(Exception $e) {
	die('Erreur : '.$e->getMessage());
}

/* return an array of random numbers without repeats */
function randomGen($min, $max, $quantity) {
	$numbers = range($min, $max);
	shuffle($numbers);
	return array_slice($numbers, 0, $quantity);
}

/* generate random numbers for unique ids (emails) */
// $randUsers = randomGen(10000,30000,1000);

$firstnames = 'AbigailAlexandraAlisonAmandaAmeliaAmyAndreaAngelaAnnaAnneAudreyAvaBellaBernadetteCarolCarolineCarolynChloeClaireDeirdreDianaDianeDonnaDorothyElizabethEllaEmilyEmmaFaithFelicityFionaGabrielleGraceHannahHeatherIreneJanJaneJasmineJenniferJessicaJoanJoanneJuliaKarenKatherineKimberlyKylieLaurenLeahLillianLilyLisaMadeleineMariaMaryMeganMelanieMichelleMollyNatalieNicolaOliviaPenelopePippaRachelRebeccaRoseRuthSallySamanthaSarahSoniaSophieStephanieSueTheresaTraceyUnaVanessaVictoriaVirginiaWandaWendyYvonneZoeAdamAdrianAlanAlexanderAndrewAnthonyAustinBenjaminBlakeBorisBrandonBrianCameronCarlCharlesChristianChristopherColinConnorDanDavidDominicDylanEdwardEricEvanFrankGavinGordonHarryIanIsaacJackJacobJakeJamesJasonJoeJohnJonathanJosephJoshuaJulianJustinKeithKevinLeonardLiamLucasLukeMattMaxMichaelNathanNeilNicholasOliverOwenPaulPeterPhilPiersRichardRobertRyanSamSeanSebastianSimonStephenStevenStewartThomasTimTrevorVictorWarrenWilliam';

$lastnames = 'AbrahamAllanAlsopAndersonArnoldAveryBaileyBakerBallBellBerryBlackBlakeBondBowerBrownBucklandBurgessButlerCameronCampbellCarrChapmanChurchillClarkClarksonColemanCornishDavidsonDaviesDickensDowdDuncanDyerEdmundsEllisonFergusonFisherForsythFraserGibsonGillGloverGrahamGrantGrayGreeneHamiltonHardacreHarrisHartHemmingsHendersonHillHodgesHowardHudsonHughesHunterInceJacksonJamesJohnstonJonesKellyKerrKingKnoxLambertLangdonLawrenceLeeLewisLymanMacDonaldMackayMackenzieMacLeodManningMarshallMartinMathisMayMcDonaldMcLeanMcGrathMetcalfeMillerMillsMitchellMorganMorrisonMurrayNashNewmanNolanNorthOgdenOliverPaigeParrParsonsPatersonPaynePeakePetersPiperPoolePowellPullmanQuinnRamplingRandallReesReidRobertsRobertsonRossRussellRutherfordSandersonScottSharpShortSimpsonSkinnerSlaterSmithSpringerStewartSutherlandTaylorTerryThomsonTuckerTurnerUnderwoodVanceVaughanWalkerWallaceWalshWatsonWelchWhiteWilkinsWilsonWrightYoung';

$maildomain = explode(' ', 'gmail.com yahoo.fr outlook.co.uk protonmail.com');

/* create arrays of firstnames and lastnames */
preg_match_all('/[A-Z][^A-Z]*/',$firstnames,$fresults);
preg_match_all('/[A-Z][^A-Z]*/',$lastnames,$lresults);

// foreach($fresults[0] as $k => $v)
// 	echo '['.$k.'] '.$v.'<br/>';

/* =============== */
/* 
	INSERT INTO request
	name, firstName, lastName, email, result fields only are not empty

	ONCE this request is executed, it can be commented
*/
/* get last row value */
$q = $bdd->query('SELECT id, name, firstName, lastName, email, result, `date` FROM learning_records');

// $req = $bdd->prepare('INSERT INTO learning_records(name, firstName, lastName, nickName, email, loginMethod, tableOfSymbols, question, answer, feedback, result) VALUES(:name, :firstName, :lastName, :nickName, :email, :loginMethod, :toSymbols, :question, :answer, :feedback, :result)');

// $fname = [];
// $lname = [];
// $name = [];

// for($i=0;$i<1000;$i++) {
// 	/* get random firstname */
// 	$fname[$i] = $fresults[0][rand(0,count($fresults[0])-1)];
// 	/* get random lastname */
// 	$lname[$i] = $lresults[0][rand(0,count($lresults[0])-1)];

// 	$name[$i] = strtolower($fname[$i].'.'.$lname[$i]).$randUsers[$i];
// }

// $j = 0;

// for($i=0;$i<10000;$i++) {
// 	// print_r($req->errorInfo());

// 	$req->execute(array(
// 		  'name'		=> $name[$j]
// 		, 'firstName'	=> $fname[$j]
// 		, 'lastName'	=> $lname[$j]
// 		, 'nickName'	=> ''
// 		, 'email'		=> $name[$j].'@'.$maildomain[rand(0,count($maildomain)-1)]
// 		, 'loginMethod'	=> ''
// 		, 'toSymbols'	=> ''
// 		, 'question'	=> ''
// 		, 'answer'		=> ''
// 		, 'feedback'	=> ''
// 		, 'result'		=> rand(0,10)
// 	));

// 	if($j != 999)
// 		$j++;
// 	else
// 		$j = 0;
// }

/* =============== */
/*
	UPDATE request
	date field is updated with random dates
	DATE limit : From 1 month before current time until current time, hour is random
*/

// $req = $bdd->prepare('UPDATE `learning_records` SET `date` = :ldate WHERE `id` >= :id');
// /* Date is updated from the new random entries */
// $id = 8;

// for($i=0;$i<10000;$i++) {
// 	$ndate = time() - (rand(0,60) * 24 * rand(0,60) * rand(0,60));
// 	$timestamp = date('Y-m-d G:i:s', $ndate);

// 	$req->execute(array(
// 		  'ldate' => $timestamp
// 		, 'id'	 => $id
// 	));

// 	$id++;
// }

/* =============== */

/* Display new entries */
echo '<table style="border:1px solid;border-collapse:collapse">';
	echo '<tr style="border:1px solid">';
		echo '<th>ID</th>';
		echo '<th>name</th>';
		echo '<th>firstName</th>';
		echo '<th>lastName</th>';
		echo '<th>email</th>';
		echo '<th>result</th>';
		echo '<th>date</th>';
	echo '</tr>';
	while($e = $q->fetch()) {
		echo '<tr>';
			echo '<td style="border:1px solid">['.$e['id'].']</td>';
			echo '<td style="border:1px solid">'.$e['name'].'</td>';
			echo '<td style="border:1px solid">'.$e['firstName'].'</td>';
			echo '<td style="border:1px solid">'.$e['lastName'].'</td>';
			echo '<td style="border:1px solid">'.$e['email'].'</td>';
			echo '<td style="border:1px solid">'.$e['result'].'</td>';
			echo '<td style="border:1px solid">'.$e['date'].'</td>';
		echo '</tr>';
	}
echo '</table>';
?>