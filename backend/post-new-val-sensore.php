<?php
//error_reporting(0);

// METHOD POST

require_once "vendor/autoload.php";

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    //metodo non valido
    http_response_code(405);
    echo json_encode("metodo non valido, richiesto metodo POST");
    exit;
}

$idSensore = $_POST['id'];
$val = $_POST['valore'];

$user = new App\Database();

$query = "INSERT INTO StoricoRilevazioni (`Sensore`, `Valore`)
VALUES ($idSensore, $val)";

$results = $user->query($query, false);

// TODO aggiornare attributi IndiceBonta calcolando ogni volta la media degli ultimi valori dei sensori

if($val < 30){
	$user->indiciAppalto($idSensore);
}

header('Content-type:application/json;charset=utf-8');
echo "OK";