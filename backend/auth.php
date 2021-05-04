<?php
error_reporting(0);

// METHOD GET

require_once "vendor/autoload.php";

// if ($_SERVER['REQUEST_METHOD'] != 'POST') {
//     //metodo non valido
//     http_response_code(405);
//     echo json_encode("metodo non valido, richiesto metodo POST");
//     exit;
// }
echo "prova";

// $rest_json = file_get_contents("php://input");
// $post_json = json_decode($rest_json, true);

// $key = openssl_pkey_get_private('./keys/private.pem');
// openssl_private_decrypt(base64_decode($post_json['data']), $decrypted, file_get_contents('./keys/private.pem'), OPENSSL_PKCS1_PADDING);

// $data = json_decode($decrypted, true);
// $email = $data['email'];
// $versione = $data['versione'];

// $user = new App\Auth();
// $res = $user->emailExist($email);

// if($res == "null"){
//     http_response_code(403);
//     echo json_encode("utente non registrato");
//     exit;
// }

// if($user->versioneApp != $versione){
//     http_response_code(426);
//     echo json_encode("aggiornare");
//     exit;
// }

// $data = null;

// if($res == "utente"){
//     //utente
//     $tmp = new App\Utente();
//     $tmp->email = $email;
//     $data = $tmp->getInfo();
// }else{
//     //bar
//     $tmp = new App\Bar();
//     $tmp->email = $email;
//     $data = $tmp->getInfo();
// }

// header('Content-type:application/json;charset=utf-8');
// echo json_encode(array(
//     "Token" => $user->createToken($email),
// ));