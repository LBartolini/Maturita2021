<?php

namespace App;

use mysqli;

class Database
{
    protected $connessione;
    protected $servername = "89.46.111.134";
    protected $username = "Sql1520781";
    protected $password = "Itcatlov_1";
    protected $database = "Sql1520781_2";

    public function __construct()
    {
        $this->connessione = new mysqli($this->servername, $this->username, $this->password, $this->database);
    }

    public function emailExist($email)
    {
        //TODO
        $queryB = sprintf("SELECT email
                        FROM Bar
                        WHERE email='%s'", $email);
        
        $queryU = sprintf("SELECT email
                        FROM Utente
                        WHERE email='%s'", $email);

        $resultB = $this->queryWithResults($queryB);

        $resultU = $this->queryWithResults($queryU);

        if(sizeof($resultB) > 0){
            // user is BAR
            return "bar";
        }else if(sizeof($resultU) > 0){
            // user is UTENTE
            return "utente";
        }

        // email non presente nel DB
        return "null";
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