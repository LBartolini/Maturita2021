import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@src/UserContext.js";
import "./infrInfo.css";
import GlobalVar from "@src/GlobalVar.js";
import { useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { Line } from 'react-chartjs-2';
import { useHistory } from "react-router-dom";
import { scegliColoreGrafico, trovaColoreStato } from "@src/Utils.js";

const InfrInfo = () => {
	const { user, setUser } = useContext(UserContext);
	const [ponte, setPonte] = useState(null);
	const [datiManutenzione, setDatiManutenzione] = useState([]);
	const [paramAttuale, setParamAttuale] = useState("scegliere parametro...");
	const { id } = useParams();
	const history = useHistory();

	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		},
	};

	const fetchDatiManutenzione = () => {
		fetch("http://localhost:5555/dati-esempio").then(response => response.json())
			.then(data => {
				setDatiManutenzione(data);
			});
	}

	useEffect(() => {
		//controllo utente
		if(user){
			//utente logged in
			if(user.categoria == "Societa Manutenzione"){
				setUser(null);
				history.push("/");
			}
		}else{
			//utente non ha fatto l'accesso
			history.push("/");
		}

		fetch(GlobalVar.urlAPI+"/dati-esempio").then(response => response.json())
			.then(data => {
				setDatiManutenzione(data);

				setPonte({
					id: id,
					nome_ponte: "Ponte X",
					stato: 80,
					parametri: ["Asfalto", "Elettricita Alta", "Elettricita Bassa", "Struttura"],
				});
			});
	}, []);

	return (
		<div className="infrInfo router-content" >
			{ponte && (<>
				<div className="infr-head">
					<h2>Ponte: {ponte.nome_ponte}</h2>
					<h2>Id: {ponte.id}</h2>
					<h2 id="h-stato" style={{color: trovaColoreStato(ponte.stato)}}>Stato: {ponte.stato}%</h2>
				</div>
				<div className="infr-body">
					<div className="infr-btns">
						<button onClick={() => { fetchDatiManutenzione() }}>Aggiorna dati</button>
						{user && user.categoria == "Societa Autostrada" ?
							<div className="infr-btns-appalto">
								<button onClick={() => { fetchDatiManutenzione() }}>Indici Appalto</button>
								<h5>per parametro</h5>
								<Dropdown>
									<Dropdown.Toggle style={{color: "black"}}>
										{paramAttuale}
									</Dropdown.Toggle>
									<Dropdown.Menu>
										{
											ponte.parametri.map((val) => <Dropdown.Item key={val} onClick={() => { setParamAttuale(val) }}>{val}</Dropdown.Item>)
										}
									</Dropdown.Menu>
								</Dropdown>
							</div>
							: <></>}
					</div>
					<div className="infr-grafico">
						<Line data={{
							labels: datiManutenzione.labels,
							datasets: datiManutenzione.parametri.map(datiParametro => {
								return {
									label: datiParametro.parametro,
									data: datiParametro.values,
									fill: false,
									backgroundColor: 'rgb(255, 255, 255)',
									borderColor: scegliColoreGrafico(datiParametro.parametro),
								}
							}),
						}} options={options} height={20} width={50} />
					</div>
				</div>
			</>)}
		</div>
	);
};

export default InfrInfo;