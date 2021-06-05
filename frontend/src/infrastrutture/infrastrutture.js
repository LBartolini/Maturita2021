import React, {useState, useEffect, useContext} from 'react';
import {
	useHistory
  } from "react-router-dom";
import './infrastrutture.css';
import {UserContext} from "@src/UserContext.js";
import Infrastruttura from './components/infrastruttura.js';
import GlobalVar from "@src/GlobalVar.js";


const InfrScreen = () => {
	const {user, setUser} = useContext(UserContext);
	const history = useHistory();
	const [infr, setInfr] = useState([])

	useEffect(() => {
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

		fetch(GlobalVar.urlAPI+'/infrastrutture.php', {
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
			setInfr(data);
		})
        .catch(err => console.log(err));
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