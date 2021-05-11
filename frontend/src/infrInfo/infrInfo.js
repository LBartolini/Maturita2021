import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@src/UserContext.js";
import Dropdown from "react-bootstrap/Dropdown";
import "./infrInfo.css";
import { useParams } from "react-router-dom";

const InfrInfo = () => {
	const { user, setUser } = useContext(UserContext);
	const [ponte, setPonte] = useState(null);
	const [paramManutenzione, setParamManutenzione] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		// sostituire con fetch
		fetch("http://localhost:5555/dati-esempio").then(response => response.json())
		.then(data => {
			setParamManutenzione({
				idSensore: 3,
				parametro: "Asfalto",
				now: 15,
				values: data
			});

			setPonte({
				id: id,
				nome_ponte: "Ponte X",
				stato: 50,
				parametri: ["Asfalto", "El_Alta", "El_Bassa", "Struttura"],
			});
		});
		
	}, []);

	return (
		<div className="infrInfo router-content" >
			{ponte && (<>
				<div className="infr-head">
					<h2>Ponte: {ponte.nome_ponte}</h2>
					<h2>Id: {ponte.id}</h2>
					<h2>Stato: {ponte.stato}%</h2>
				</div>
				<div className="infr-body">
					<div className="infr-btns">
						<h3> NOW: {paramManutenzione.now} </h3>
						<Dropdown>
							<Dropdown.Toggle>
								Cambia Parametro di osservazione
							</Dropdown.Toggle>
							<Dropdown.Menu>
								{
									ponte.parametri.map((val) => <Dropdown.Item key={val} onClick={() => {
										setParamManutenzione((state) => {
											return {
												...state,
												parametro: val,
												now: state.now + 1,
											}
										})
											;
									}}>{val}</Dropdown.Item>)
								}
							</Dropdown.Menu>
						</Dropdown>
						<button onClick={() => {
							console.log(paramManutenzione);
							}}>Aggiorna<br />dati</button>
					</div>
					<div className="infr-grafico">
					</div>
				</div>
			</>)}
		</div >
	);
};

export default InfrInfo;