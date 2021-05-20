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
header('Content-Type: application/json');

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

$filtro = $_GET["filtro"];
$cat = $_GET["cat"];

if(!($user->validate($token))){
	//token non valido
	http_response_code(401);
	echo json_encode("token non valido");
}

// token corretto
$to_send = [];

if($filtro == "Tutti" && $cat != "Societa Manutenzione"){
	$query = "SELECT IdAppalto AS id, I.Nome AS infrastruttura, Parametro AS parametro, I.IndiceBonta AS indiceBonta 
	FROM Appalto AS A INNER JOIN Infrastruttura AS I ON Infrastruttura=CodiceInfr 
	WHERE IdAppalto IN (
		SELECT Appalto FROM AppaltoAperto
		)
	ORDER BY DataApertura";

	$to_send = $user->query($query);
}else if($filtro != "Tutti" && $cat != "Societa Manutenzione"){
	$query = "SELECT IdAppalto AS id, I.Nome AS infrastruttura, Parametro AS parametro, I.IndiceBonta AS indiceBonta 
	FROM Appalto AS A INNER JOIN Infrastruttura AS I ON Infrastruttura=CodiceInfr 
	WHERE IdAppalto IN (
		SELECT Appalto FROM AppaltoAperto
		) AND Parametro = '$filtro'
	ORDER BY DataApertura";

	$to_send = $user->query($query);
}else if($filtro == "Tutti" && $cat == "Societa Manutenzione"){
	$query = "SELECT IdAppalto AS id, I.Nome AS infrastruttura, Parametro AS parametro, I.IndiceBonta AS indiceBonta 
	FROM Appalto AS A INNER JOIN Infrastruttura AS I ON Infrastruttura=CodiceInfr 
	WHERE IdAppalto IN (
		SELECT Appalto FROM AppaltoAperto
		) AND Parametro IN (
			SELECT Parametro
			FROM Disponibilita
			WHERE SocietaManutenzione='$user->email'
		)
	ORDER BY DataApertura";

	$to_send = $user->query($query);
}else{
	$query = "SELECT IdAppalto AS id, I.Nome AS infrastruttura, Parametro AS parametro, I.IndiceBonta AS indiceBonta 
	FROM Appalto AS A INNER JOIN Infrastruttura AS I ON Infrastruttura=CodiceInfr 
	WHERE IdAppalto IN (
		SELECT Appalto FROM AppaltoAperto
		) AND Parametro IN (
			SELECT Parametro
			FROM Disponibilita
			WHERE SocietaManutenzione='$user->email' AND Parametro='$filtro'
		)
	ORDER BY DataApertura";

	$to_send = $user->query($query);
}

header('Content-type:application/json;charset=utf-8');
echo json_encode($to_send);