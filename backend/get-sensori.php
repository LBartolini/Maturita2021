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

$user = new App\Database();

$results = $user->query("SELECT *
                        FROM Sensore");


header('Content-type:application/json;charset=utf-8');
echo json_encode($results);
