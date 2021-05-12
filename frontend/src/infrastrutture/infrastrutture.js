import React, {useState, useEffect, useContext} from 'react';
import {
	useHistory
  } from "react-router-dom";
import './infrastrutture.css';
import {UserContext} from "@src/UserContext.js";
import Infrastruttura from './components/infrastruttura.js';


const InfrScreen = () => {
	const {user, setUser} = useContext(UserContext);
	const history = useHistory();
	const [infr, setInfr] = useState([])

	useEffect(() => {
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

		const x = [];
		for(let i = 0; i<10; i++){
			x.push({
				id: i,
				nome: "Ponte"
			})
		}
		setInfr(x);
	}, []);

	return (
		<div className="infr router-content">
			<ul className="infr-ul">
				{infr.map((inf, idx) => <li key={idx} className="infr-li"><Infrastruttura infr={inf}/></li>)}
			</ul>
		</div>
	);
}

export default InfrScreen;