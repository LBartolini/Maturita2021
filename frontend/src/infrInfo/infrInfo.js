import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@src/UserContext.js";
import "./infrInfo.css";
import GlobalVar from "@src/GlobalVar.js";
import { useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { Line } from 'react-chartjs-2';
import { useHistory } from "react-router-dom";
import { scegliColoreGrafico, trovaColoreStato, LastDays } from "@src/Utils.js";

const InfrInfo = () => {
	const { user, setUser } = useContext(UserContext);
	const [ponte, setPonte] = useState(null);
	const [datiManutenzione, setDatiManutenzione] = useState(null);
	const [paramAttuale, setParamAttuale] = useState("scegli...");
	const { id } = useParams();
	const history = useHistory();

	const options = {
		scales : {
			y : {
				min: 0,
				max: 110,
			}
		}
	};
	
	const fetchDatiManutenzione = () => {
		fetch(GlobalVar.urlAPI+'/valori-sensori.php?id='+id, {
            method: 'GET',
            headers: {
                "Authentication": GlobalVar.token
            }
        }) 
        .then(response => {
            if(response.status == 200){
                return response.json();
            }else{
                setUser(null);
				GlobalVar.token = "";
				history.push("/atmi/");
                throw new Error;
            }
        })
        .then(data => {
			setDatiManutenzione(data);
		})
        .catch(err => console.log(err));
	}

	const newAppalto = () => {
		if(paramAttuale == "scegli..."){
			alert("Selezionare un parametro!");
			return;
		}

		let to_send = {
			id: id,
			parametro: paramAttuale
		};

		fetch(GlobalVar.urlAPI+'/new-appalto.php', {
            method: 'POST',
            headers: {
                "Authentication": GlobalVar.token,
				"Content-Type": "application/json"
            },
			body: JSON.stringify(to_send)
        }) 
        .then(response => {
            if(response.status == 200){
                return response.json();
            }else{
                setUser(null);
				GlobalVar.token = "";
				history.push("/atmi/");
                throw new Error;
            }
        })
        .then(data => {
			if(data){
				alert("Appalto indetto con successo!");
			}else{
				alert("Impossibile indire appalto!");
			}
		})
        .catch(err => console.log(err));
	}

	useEffect(() => {
		//controllo utente
		if(user){
			//utente logged in
			if(user.categoria == "Societa Manutenzione"){
				setUser(null);
				GlobalVar.token = "";
				history.push("/atmi/");
			}
		}else{
			//utente non ha fatto l'accesso
			history.push("/atmi/");
		}

		fetch(GlobalVar.urlAPI+'/info-infr.php?id='+id, {
            method: 'GET',
            headers: {
                "Authentication": GlobalVar.token
            }
        }) 
        .then(response => {
            if(response.status == 200){
                return response.json();
            }else{
                setUser(null);
				GlobalVar.token = "";
				history.push("/atmi/");
                throw new Error;
            }
        })
        .then(data => {
			setPonte(data);
			fetchDatiManutenzione();
		})
        .catch(err => console.log(err));
	}, []);

	return (
		<div className="infrInfo router-content" >
			{ponte && (<>
				<div className="infr-head">
					<h2>{ponte.Nome}</h2>
					<h2>{ponte.Autostrada}</h2>
					<h2>Id: {ponte.Id}</h2>
					<h2 id="h-stato" style={{color: trovaColoreStato(parseFloat(ponte.IndiceBonta).toFixed(2))}}>Indice Bontà: {parseFloat(ponte.IndiceBonta).toFixed(2)}%</h2>
				</div>
				<div className="infr-body">
					<div className="infr-btns">
						<button onClick={() => { fetchDatiManutenzione() }}>Aggiorna dati</button>
						{user && user.categoria == "Societa Autostrada" ?
							<div className="infr-btns-appalto">
								<button onClick={() => {newAppalto()}}>Genera Appalto</button>
								<h5>per parametro:</h5>
								<Dropdown>
									<Dropdown.Toggle style={{color: "black"}}>
										{paramAttuale}
									</Dropdown.Toggle>
									<Dropdown.Menu>
										{
											ponte.Parametri.map((val) => <Dropdown.Item key={val} onClick={() => { setParamAttuale(val) }}>{val}</Dropdown.Item>)
										}
									</Dropdown.Menu>
								</Dropdown>
							</div>
							: <></>}
					</div>
					{datiManutenzione && (
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
					</div> )}
				</div>
			</>)}
		</div>
	);
};

export default InfrInfo;