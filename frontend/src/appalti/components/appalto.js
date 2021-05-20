import React, {useContext} from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button'
import { UserContext } from "@src/UserContext.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { trovaColoreProgressBar } from "@src/Utils.js";

const Appalto = ({ appalto }) => {
	const {user} = useContext(UserContext);
	const indiceBonta = appalto.indiceBonta;

	return (
		<div className="appalto-item">
			<div className="appalto-item-inside">
				<div className="appalto-item-info">
					<h2>{appalto.infrastruttura}</h2>
					<h2>Parametro: {appalto.parametro}</h2>
					<h2>Codice Appalto: {appalto.id}</h2>
				</div>
				<div className="appalto-item-sensori">
					<h2>Stato di Manutenzione [{indiceBonta}%]</h2>
					<ProgressBar  animated striped variant={trovaColoreProgressBar(indiceBonta)} now={indiceBonta}/>
				</div>
				{ user && user.categoria == "Societa Manutenzione" ? 
				<div className="appalto-item-btn">
					<Button variant="secondary" onClick={() => {}}>ESEGUI <br/> INTERVENTO</Button>
				</div>
				: <></>}
			</div>
		</div>
	);
}

export default Appalto;