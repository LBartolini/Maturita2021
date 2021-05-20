<?php
//error_reporting(0);

// METHOD POST

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

require_once "vendor/autoload.php";

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    //metodo non valido
    http_response_code(405);
    echo json_encode("metodo non valido, richiesto metodo POST");
    exit;
}
$header = apache_request_headers();
$token = $header['Authentication'];

$rest_json = file_get_contents("php://input");
$post_json = json_decode($rest_json, true);

$appalto = $post_json['appalto'];

$user = new App\Auth();

if(!($user->validate($token))){
	//token non valido
	http_response_code(401);
	echo json_encode("token non valido");
	exit;
}

$query = "INSERT INTO AppaltoConcluso (`Appalto`, `SocietaManutenzione`)
VALUES ('$appalto', '$user->email')";
$user->query($query, false);

$query = "SELECT IdSensore
	FROM Sensore
	WHERE Parametro IN (
		SELECT Parametro
		FROM Appalto
		WHERE IdAppalto='$appalto'
	) AND
	Infrastruttura IN (
		SELECT Infrastruttura
		FROM Appalto
		WHERE IdAppalto='$appalto'
	)";
$sensore = $user->query($query)[0]->IdSensore;


$query = "INSERT INTO StoricoRilevazioni (`Sensore`, `DataRilevazione`, `Valore`)
VALUES ('$sensore', CURDATE(), '100')
ON DUPLICATE KEY UPDATE Valore='100'";
$user->query($query, false);

$user->ricalcolaIndiceBonta($sensore);

$query = "DELETE FROM AppaltoAperto
			WHERE Appalto='$appalto'";
$user->query($query, false);

header('Content-type:application/json;charset=utf-8');
echo "OK";