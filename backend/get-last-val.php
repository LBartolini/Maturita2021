<?php
error_reporting(0);

// METHOD GET

require_once "vendor/autoload.php";

if ($_SERVER['REQUEST_METHOD'] != 'GET') {
    //metodo non valido
    http_response_code(405);
    echo json_encode("metodo non valido, richiesto metodo GET");
    exit;
}

$idSensore = $_GET["id"];
$limite = $_GET["limite"];

$user = new App\Database();

$results = $user->query("SELECT DATE(DataRilevazione) as data, Valore
                        FROM StoricoRilevazioni
						WHERE Sensore=$idSensore
						ORDER BY DATE(DataRilevazione) DESC
						LIMIT $limite");


header('Content-type:application/json;charset=utf-8');
echo json_encode($results);
