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

$query = "INSERT INTO StoricoRilevazioni (`Sensore`, `Valore`, `DataRilevazione`)
VALUES ($idSensore, $val, CURDATE())";

$user->query($query, false);

$user->ricalcolaIndiceBonta($idSensore);

if($val < 30){
	$user->indiciAppalto($idSensore);
}

header('Content-type:application/json;charset=utf-8');
echo "OK";