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

if(!($user->validate($token))){
	//token non valido
	http_response_code(401);
	echo json_encode("token non valido");
	exit;
}
// token corretto

$idInfr = $_GET["id"];

$prep = $user->connessione->prepare("SELECT Nome, Autostrada, Autostrada, IndiceBonta
                        	FROM Infrastruttura
							WHERE CodiceInfr=?");    
$prep->bind_param("i", $idInfr);
$prep->execute();
$result = $prep->get_result();
$arr = [];
while($row = $result->fetch_assoc()){
	$arr[] = $row;
}

$infr = $arr[0];

$parametri = [];
$prep = $user->connessione->prepare("SELECT DISTINCT(S.Parametro)
                        FROM Sensore as S
						WHERE S.Infrastruttura=?");    
$prep->bind_param("i", $idInfr);
$prep->execute();
$result = $prep->get_result();
while($row = $result->fetch_assoc()){
	$parametri[] = $row["Parametro"];
}

$to_send[] = array(
	"Id" => $idInfr,
	"Nome" => $infr["Nome"],
	"Autostrada" => $infr["Autostrada"],
	"IndiceBonta" => $infr["IndiceBonta"],
	"Parametri" => $parametri
);


header('Content-type:application/json;charset=utf-8');
echo json_encode($to_send[0]);