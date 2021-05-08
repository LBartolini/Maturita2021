import React, {useState, useEffect} from 'react';
import {
	useHistory
  } from "react-router-dom";
import './infrastrutture.css';
import Infrastruttura from './components/infrastruttura.js';


const InfrScreen = () => {
	const history = useHistory();
	const [infr, setInfr] = useState([])

	useEffect(() => {
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