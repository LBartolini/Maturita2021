import React, { useState, useEffect, useContext } from 'react';
import {
	useHistory
} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import './appalti.css';
import { UserContext } from "@src/UserContext.js";
import GlobalVar from "@src/GlobalVar.js";
import Appalto from './components/appalto.js';

const AppaltiScreen = () => {
	const { user, setUser } = useContext(UserContext);
	const history = useHistory();
	const [appalti, setAppalti] = useState([]);
	const [filtroParam, setFiltroParam] = useState("Tutti");

	useEffect(() => {
		// viene eseguito ad ogni render
		if (!user) {
			history.push("/");
		}
	});

	const aggiornaDati = () => {
		fetch(GlobalVar.urlAPI+'/appalti-aperti.php?filtro='+filtroParam+'&cat='+user.categoria, {
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
				history.push("/");
                throw new Error;
            }
        })
        .then(data => {
			setAppalti(data);
		})
        .catch(err => console.log(err));
	}

	useEffect(() => {
		// viene eseguito quando cambia il filtro
		aggiornaDati();
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
							<Dropdown.Item key={0} onClick={() => { setFiltroParam("Tutti") }}>Tutti</Dropdown.Item>
							{
								user.disponibilitaParametri.map((val, idx) => <Dropdown.Item key={idx} onClick={() => { setFiltroParam(val) }}>{val}</Dropdown.Item>)
							}
						</Dropdown.Menu>
						:
						<Dropdown.Menu>
							<Dropdown.Item key={0} onClick={() => { setFiltroParam("Tutti") }}>Tutti</Dropdown.Item>
							<Dropdown.Item key={1} onClick={() => { setFiltroParam("Elettricita") }}>Elettricita</Dropdown.Item>
							<Dropdown.Item key={3} onClick={() => { setFiltroParam("Asfalto") }}>Asfalto</Dropdown.Item>
							<Dropdown.Item key={4} onClick={() => { setFiltroParam("Struttura") }}>Struttura</Dropdown.Item>
						</Dropdown.Menu>}
				</Dropdown>
			</div>

			<ul className="appalti-ul">
				{appalti.map((app, idx) => <li key={idx} className="infr-li"><Appalto appalto={app} aggiornaDati={() => aggiornaDati()}/></li>)}
			</ul>
		</div>
	);
}

export default AppaltiScreen;