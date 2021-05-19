<?php
error_reporting(0);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
	header('Access-Control-Allow-Headers: Authentication, Content-Type');
	header('Access-Control-Max-Age: 1728000');
	header('Content-Length: 0');
	header('Content-Type: text/plain');
	die();
}

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Authentication, Content-Type');

// METHOD GET

require_once "vendor/autoload.php";

if ($_SERVER['REQUEST_METHOD'] != 'GET') {
    //metodo non valido
    http_response_code(405);
    echo json_encode("metodo non valido, richiesto metodo GET");
    exit;
}

$header = apache_request_headers();
$token = $header['Authentication'];

$user = new App\Auth();

if(!($user->validate($token))){
	//token non valido
	http_response_code(401);
	echo json_encode("token non valido");
	exit;
}
// token corretto

$idInfr = $_GET["id"];

$prep = $user->connessione->prepare("SELECT IdSensore, Parametro
                        	FROM Sensore
							WHERE Infrastruttura=?");    
$prep->bind_param("i", $idInfr);
$prep->execute();
$result = $prep->get_result();
$sensori = [];
while($row = $result->fetch_assoc()){
	$sensori[] = $row;
}

// TODO prendere i dati dei sensori e formattarli ricordandosi delle date strane...
$parametri = [];
foreach($sensori as $sens){
	$idSens = $sens['IdSensore'];
	$last = $user->query("SELECT Valore
			FROM StoricoRilevazioni
			WHERE Sensore=$idSens
			ORDER BY DATE(DataRilevazione)
			LIMIT 15");
	
	$valori = [];
	foreach($last as $val){
		$valori[] = (float) $val->Valore;
	}

	$parametri[] = array(
		"parametro" => $sens["Parametro"],
		"values" => $valori
	);
}

$prep = $user->connessione->prepare("SELECT DISTINCT(DATE(DataRilevazione)) AS data 
			FROM StoricoRilevazioni
			WHERE Sensore IN (
				SELECT IdSensore
                FROM Sensore
				WHERE Infrastruttura=? 
			) 
			ORDER BY DataRilevazione 
			LIMIT 15");    
$prep->bind_param("i", $idInfr);
$prep->execute();
$result = $prep->get_result();
$date = [];
while($row = $result->fetch_assoc()){
	$date[] = $row["data"];
}

$to_send = array(
	"parametri" => $parametri,
	"labels" => $date
);



header('Content-type:application/json;charset=utf-8');
echo json_encode($to_send);