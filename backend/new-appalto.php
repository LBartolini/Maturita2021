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

// METHOD POST

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

$CodInfr = $post_json['id'];
$parametro = $post_json['parametro'];

$user = new App\Auth();

if(!($user->validate($token))){
	//token non valido
	http_response_code(401);
	echo json_encode("token non valido");
	exit;
}
// token corretto

$result = $user->indiciAppaltoCP($CodInfr, $parametro);

header('Content-type:application/json;charset=utf-8');
echo json_encode($result);