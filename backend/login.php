<?php
error_reporting(0);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
	header('Access-Control-Allow-Headers: Content-Type');
	header('Access-Control-Max-Age: 1728000');
	header('Content-Length: 0');
	header('Content-Type: text/plain');
	die();
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// METHOD GET

require_once "vendor/autoload.php";

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    //metodo non valido
    http_response_code(405);
    echo json_encode("metodo non valido, richiesto metodo POST");
    exit;
}

$rest_json = file_get_contents("php://input");
$post_json = json_decode($rest_json, true);

$email = $post_json['email'];
$password = $post_json['password'];

$user = new App\Auth();
$res = $user->emailExist($email);

if(!($res)){
    http_response_code(403);
    echo json_encode("utente non registrato");
    exit;
}

// utente registrato

$passwordOK = $user->checkPassword($password, $email);

if(!($passwordOK)){
	// password errata
	http_response_code(401);
	echo json_encode("password errata");
	exit;
}

$prep = $user->connessione->prepare("SELECT *
                        	FROM Utente
							WHERE Email=?");
        
$prep->bind_param("s", $email);
$prep->execute();
$result = $prep->get_result();

$arr = [];

while($row = $result->fetch_assoc()){
	$arr[] = $row;
}



if($user->isSocMan($email)){
	$prep = $user->connessione->prepare("SELECT *
                        	FROM Disponibilita
							WHERE SocietaManutenzione=?");
        
	$prep->bind_param("s", $email);
	$prep->execute();
	$result = $prep->get_result();

	$disponibilita = [];

	while($row = $result->fetch_assoc()){
		$disponibilita[] = $row["Parametro"];
	}

	$to_send = array(
		"Token" => $user->createToken($email),
		"Categoria" => $arr[0]["Categoria"],
		"Disponibilita" => $disponibilita
	);

}else{
	$to_send = array(
		"Token" => $user->createToken($email),
		"Categoria" => $arr[0]["Categoria"]
	);
}

if(sizeof($arr) > 0){
    header('Content-type:application/json;charset=utf-8');
	echo json_encode($to_send);
}