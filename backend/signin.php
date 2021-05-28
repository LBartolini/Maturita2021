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

// METHOD POST	

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
$asfalto = $post_json['parametri']['asfalto'];
$struttura = $post_json['parametri']['struttura'];
$elettricita = $post_json['parametri']['elettricita'];

$user = new App\Auth();
$res = $user->emailExist($email);

if($res){
    http_response_code(410);
    echo json_encode("email non disponibile");
    exit;
}

// email disponibile
$prep = $user->connessione->prepare("INSERT INTO Utente (`Email`, `Password`, `Categoria`) 
									VALUES (?, ?, 'Societa Manutenzione')");
        
$prep->bind_param("ss", $email, password_hash($password, PASSWORD_BCRYPT));
$prep->execute();

$prep = $user->connessione->prepare("INSERT INTO SocietaManutenzione (`Utente`) VALUES (?);");
        
$prep->bind_param("s", $email);
$prep->execute();

if($asfalto){
	$prep = $user->connessione->prepare("INSERT INTO Disponibilita (`Parametro`, `SocietaManutenzione`) 
									VALUES ('Asfalto', ?)");
        
	$prep->bind_param("s", $email);
	$prep->execute();
}

if($elettricita){
	$prep = $user->connessione->prepare("INSERT INTO Disponibilita (`Parametro`, `SocietaManutenzione`) 
									VALUES ('Elettricita', ?)");
        
	$prep->bind_param("s", $email);
	$prep->execute();
}

if($struttura){
	$prep = $user->connessione->prepare("INSERT INTO Disponibilita (`Parametro`, `SocietaManutenzione`) 
									VALUES ('Struttura', ?)");
        
	$prep->bind_param("s", $email);
	$prep->execute();
}

header('Content-type:application/json;charset=utf-8');
echo json_encode("OK");
