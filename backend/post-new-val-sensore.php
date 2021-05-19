<?php
error_reporting(0);

// METHOD POST

require_once "vendor/autoload.php";

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    //metodo non valido
    http_response_code(405);
    echo json_encode("metodo non valido, richiesto metodo POST");
    exit;
}

$idSensore = $_GET["id"];
$val = $_GET["valore"];

$user = new App\Database();

$results = $user->query("INSERT INTO StoricoRilevazioni ('Sensore', 'Valore')
						VALUES ($idSensore, $val)");

if($val < 30){
	$user->indiciAppalto($idSensore);
}

header('Content-type:application/json;charset=utf-8');
echo "OK";
