<?php

namespace App;

use mysqli;

class Database
{
    public $connessione;
    protected $servername = "127.0.0.1";
    protected $username = "atmi";
    protected $password = "atmi";
    protected $database = "ATMI";

    public function __construct()
    {
        $this->connessione = new mysqli($this->servername, $this->username, $this->password, $this->database);
    }

    public function emailExist($email)
    {	
        $prep = $this->connessione->prepare("SELECT Email
                        	FROM Utente
							WHERE Email=?");
        
		$prep->bind_param("s", $email);
		$prep->execute();
		$result = $prep->get_result();

		$arr = [];

		while($row = $result->fetch_assoc()){
			$arr[] = $row;
		}

        if(sizeof($arr) > 0){
            // email presente
            return true;
        }

        // email non presente nel DB
        return false;
    }

	public function isSocMan($email)
    {
        $prep = $this->connessione->prepare("SELECT *
                        	FROM SocietaManutenzione
							WHERE Utente=?");
        
		$prep->bind_param("s", $email);
		$prep->execute();
		$result = $prep->get_result();

		$arr = [];

		while($row = $result->fetch_assoc()){
			$arr[] = $row;
		}

        if(sizeof($arr) > 0){
            // email presente
            return true;
        }

        // email non presente nel DB
        return false;
    }

	public function checkPassword($password, $email) {
		$prep = $this->connessione->prepare("SELECT Email, Password
		FROM Utente
		WHERE Email=?");

		$prep->bind_param("s", $email);
		$prep->execute();
		$result = $prep->get_result();

		$arr = [];

		while($row = $result->fetch_assoc()){
			$arr[] = $row;
		}

		if(sizeof($arr)>0){
			return password_verify($password, $arr[0]["Password"]);
		}
	}

    public function query($query)
    {
        $result = $this->connessione->query($query);
        $items = [];
        if($result->num_rows > 0){
            while ($element = mysqli_fetch_object($result)) {
                $items[] = $element;
            }
        }
        return $items;
    }
}