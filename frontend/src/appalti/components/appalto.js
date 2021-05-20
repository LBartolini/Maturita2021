import React, { useContext } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button'
import { UserContext } from "@src/UserContext.js";
import {
	useHistory
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { trovaColoreProgressBar } from "@src/Utils.js";
import GlobalVar from "@src/GlobalVar.js";

const Appalto = ({ appalto, aggiornaDati }) => {
	const { user, setUser } = useContext(UserContext);
	const indiceBonta = appalto.indiceBonta;
	const history = useHistory();

	const eseguiIntervento = () => {
		let to_send = {
			appalto: appalto.id
		};

		fetch(GlobalVar.urlAPI + '/esegui-intervento.php', {
			method: 'POST',
			headers: {
				"Authentication": GlobalVar.token,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(to_send)
		})
			.then(response => {
				if (response.status == 200) {
					return response.text();
				} else {
					setUser(null);
					GlobalVar.token = "";
					history.push("/");
					throw new Error;
				}
			})
			.then(data => {
				aggiornaDati()
			})
			.catch(err => console.log(err));
	}

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
					<ProgressBar animated striped variant={trovaColoreProgressBar(indiceBonta)} now={indiceBonta} />
				</div>
				{user && user.categoria == "Societa Manutenzione" ?
					<div className="appalto-item-btn">
						<Button variant="secondary" onClick={() => {eseguiIntervento()}}>ESEGUI <br /> INTERVENTO</Button>
					</div>
					: <></>}
			</div>
		</div>
	);
}

export default Appalto;