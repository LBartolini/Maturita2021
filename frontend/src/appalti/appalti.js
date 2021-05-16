import React, { useState, useEffect, useContext } from 'react';
import {
	useHistory
} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import './appalti.css';
import { UserContext } from "@src/UserContext.js";
import Appalto from './components/appalto.js';

const AppaltiScreen = () => {
	const { user, setUser } = useContext(UserContext);
	const history = useHistory();
	const [appalti, setAppalti] = useState([]);
	const [filtroParam, setFiltroParam] = useState("...");

	useEffect(() => {
		// viene eseguito ad ogni render
		if (!user) {
			history.push("/");
		}
	});

	useEffect(() => {
		// viene eseguito quando cambia il filtro
		// TODO fare call all'api per sovrascrivere i valori precedenti da renderizzare
		const x = [];
		for (let i = 0; i < 20; i++) {
			x.push({
				id: i,
				infrastruttura: "Ponte X",
				parametro: "Asfalto",
				stato_manutenzione: 100
			})
		}
		setAppalti(x);

	}, [filtroParam, setFiltroParam]);

	return (
		<div className="appalti router-content">

			<div className="filtri">
				<h3>Filtra per parametri: </h3>
				<Dropdown>
					<Dropdown.Toggle style={{ color: "black" }}>
						{filtroParam}
					</Dropdown.Toggle>
					{user && user.categoria == "Societa Manutenzione" ?
						<Dropdown.Menu>
							<Dropdown.Item key={0} onClick={() => { setFiltroParam("...") }}>...</Dropdown.Item>
							{
								user.disponibilitaParametri.map((val, idx) => <Dropdown.Item key={idx} onClick={() => { setFiltroParam(val) }}>{val}</Dropdown.Item>)
							}
						</Dropdown.Menu>
						:
						<Dropdown.Menu>
							<Dropdown.Item key={0} onClick={() => { setFiltroParam("...") }}>...</Dropdown.Item>
							<Dropdown.Item key={1} onClick={() => { setFiltroParam("Elettricita Alta") }}>Elettricita Alta</Dropdown.Item>
							<Dropdown.Item key={2} onClick={() => { setFiltroParam("Elettricita Bassa") }}>Elettricita Bassa</Dropdown.Item>
							<Dropdown.Item key={3} onClick={() => { setFiltroParam("Asfalto") }}>Asfalto</Dropdown.Item>
							<Dropdown.Item key={4} onClick={() => { setFiltroParam("Struttura") }}>Struttura</Dropdown.Item>
						</Dropdown.Menu>}
				</Dropdown>
			</div>

			<ul className="appalti-ul">
				{appalti.map((app, idx) => <li key={idx} className="infr-li"><Appalto appalto={app} /></li>)}
			</ul>
		</div>
	);
}

export default AppaltiScreen;