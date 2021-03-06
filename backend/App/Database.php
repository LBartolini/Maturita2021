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

        while ($row = $result->fetch_assoc()) {
            $arr[] = $row;
        }

        if (sizeof($arr) > 0) {
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

        while ($row = $result->fetch_assoc()) {
            $arr[] = $row;
        }

        if (sizeof($arr) > 0) {
            // email presente
            return true;
        }

        // email non presente nel DB
        return false;
    }

    public function checkPassword($password, $email)
    {
        $prep = $this->connessione->prepare("SELECT Email, Password
		FROM Utente
		WHERE Email=?");

        $prep->bind_param("s", $email);
        $prep->execute();
        $result = $prep->get_result();

        $arr = [];

        while ($row = $result->fetch_assoc()) {
            $arr[] = $row;
        }

        if (sizeof($arr) > 0) {
            return password_verify($password, $arr[0]["Password"]);
        }
    }

    public function checkAppaltoAperto($CodiceInfr, $Parametro)
    {
        $query = "SELECT * 
					FROM Appalto
					WHERE Infrastruttura=$CodiceInfr AND Parametro='$Parametro'
					AND IdAppalto IN (SELECT Appalto
							FROM AppaltoAperto)";

        $res = $this->query($query);

        if (sizeof($res) > 0) {
            // ?? gi?? aperto un appalto per quel parametro
            return true;
        }
        // NON c'?? un appalto paerto per quel parametro
        return false;
    }

    public function indiciAppalto($idSensore)
    {
        $query = "SELECT * 
					FROM `Sensore`
					WHERE `IdSensore`=$idSensore";

        $res = $this->query($query)[0];
        $CodiceInfr = $res->Infrastruttura;
        $Parametro = $res->Parametro;

        if ($this->checkAppaltoAperto($CodiceInfr, $Parametro)) {
            // appalto gi?? aperto
            return false;
        }

        $query = "INSERT INTO Appalto (Parametro, Infrastruttura)
				VALUES ('$Parametro', $CodiceInfr)";

        $this->query($query, false);

        $query = "SELECT IdAppalto
					FROM Appalto
					WHERE Infrastruttura=$CodiceInfr AND Parametro='$Parametro'
					ORDER BY DataApertura DESC
					LIMIT 1";

        $IdAppalto = $this->query($query)[0]->IdAppalto;

        $query = "INSERT INTO AppaltoAperto (Appalto)
				VALUES ('$IdAppalto')";

        $this->query($query);

        return true;
    }

    public function indiciAppaltoCP($CodiceInfr, $Parametro)
    { // indici appalto CP (codice infr e parametro)
        if ($this->checkAppaltoAperto($CodiceInfr, $Parametro)) {
            // appalto gi?? aperto
            return false;
        }

        $query = "INSERT INTO Appalto (Parametro, Infrastruttura)
				VALUES ('$Parametro', $CodiceInfr)";

        $this->query($query, false);

        $query = "SELECT IdAppalto
					FROM Appalto
					WHERE Infrastruttura=$CodiceInfr AND Parametro='$Parametro'
					ORDER BY DataApertura DESC
					LIMIT 1";

        $IdAppalto = $this->query($query)[0]->IdAppalto;

        $query = "INSERT INTO AppaltoAperto (Appalto)
				VALUES ('$IdAppalto')";

        $this->query($query);

        return true;
    }

    public function ricalcolaIndiceBonta($IdSensore)
    {
        // TODO Ricalcolare indice bonta dell'infrastruttura collegata
        $query = "
		UPDATE Infrastruttura
		SET IndiceBonta=(
			SELECT AVG(Valore)
			FROM (
				SELECT a.Valore
				FROM (
					SELECT *
					FROM StoricoRilevazioni
					WHERE Sensore IN (
						SELECT IdSensore 
						FROM Sensore
						WHERE Infrastruttura IN (
							SELECT Infrastruttura
							FROM Sensore
							WHERE IdSensore='$IdSensore'
						)
					)
				ORDER BY DataRilevazione DESC) as a
			WHERE a.DataRilevazione=(
				SELECT MAX(b.DataRilevazione)
				FROM StoricoRilevazioni AS b
				WHERE b.Sensore=a.Sensore
			)
			GROUP BY a.Sensore) as c)
		WHERE CodiceInfr=(
			SELECT Infrastruttura
			FROM Sensore
			WHERE IdSensore='$IdSensore'
		)";

        $this->query($query, false);
    }

    public function query($query, $acceptResults = true)
    {
        $result = $this->connessione->query($query);
        $items = [];
        if ($acceptResults && $result->num_rows > 0) {
            while ($element = mysqli_fetch_object($result)) {
                $items[] = $element;
            }
        }
        return $items;
    }
}
