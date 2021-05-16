import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button'
import {
	useHistory
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { trovaColoreProgressBar } from "@src/Utils.js";

const Infrastruttura = ({ infr }) => {
	const indice_bonta = 50;
	const history = useHistory();

	return (
		<div className="infr-item">
			<div className="infr-item-inside">
				<div className="infr-item-info">
					<h2>Nome: {infr.nome}</h2>
					<h2>Codice: {infr.id}</h2>
				</div>
				<div className="infr-item-sensori">
					<h2>Indice di Bontà [{indice_bonta}%]</h2>
					<ProgressBar  animated striped variant={trovaColoreProgressBar(indice_bonta)} now={indice_bonta}/>
				</div>
				<div className="infr-item-btn">
					<Button variant="secondary" onClick={() => history.push('/infr-info/'+infr.id)}>INFO</Button>
				</div>
			</div>
		</div>
	);
}

export default Infrastruttura;