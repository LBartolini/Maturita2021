<?php
namespace App;

use ReallySimpleJWT\Token;
use ReallySimpleJWT\Parse;
use ReallySimpleJWT\Jwt;
use ReallySimpleJWT\Validate;
use ReallySimpleJWT\Encode;

class Auth extends Database
{
    protected $auth = false;
    public $email = "";
    protected $secret = 'sEc!ReT423*&';

    public function createToken($email)
    {

        $expiration = time() + 3600; //60 minuti
        $issuer = 'atmi_localhost';

        $token = Token::create($email, $this->secret, $expiration, $issuer);
        return $token;
    }

    public function validate($token)
    {
        $fixed_token = str_replace('Bearer ', '', $token);

        if($this->validateToken($fixed_token)){
            $this->decodeToken($fixed_token);
            return true;
        }
        return false;
    }

    private function validateToken($token)
    {
        $result = Token::validate($token, $this->secret);
        
        $auth = $result;

        return $result;
    }

    private function decodeToken($token)
    {
        $jwt = new Jwt($token, $this->secret);

        $parse = new Parse($jwt, new Validate(), new Encode());

        $parsed = $parse->parse();

        $this->email = $parsed->getPayload()["user_id"];
    }

}