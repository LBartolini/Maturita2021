import React, {useContext} from 'react';
import {UserContext} from '@src/UserContext.js';
import {
	useHistory,
  } from "react-router-dom";
import './home.css';

const HomeScreen = () => {
	const history = useHistory();
	const {user, setUser} = useContext(UserContext);
	// per cambiare solo un attributo dello stato setUser({...stato, attr: new_value})
	return (
		<div className="home router-content">
			<div className="header-title">
				<h1>Autostrade Toscana Manutenzione Infrastrutture</h1>
				<h2>ATMI</h2>
				<h6>Stato di manutenzione di Ponti e Viadotti in Toscana</h6>
				<h6>Appalti e bandi di manutenzione</h6>
			</div>
			<div className="body-home">
				<pre style={{marginLeft: 30}}>{JSON.stringify(user, null, 2)}</pre>
				<button style={{ height: 50, marginLeft: 30 }}onClick={() => {
					setUser({
						email:"pippo@atmi.it" , 
						categoria: "Societa Manutenzione",
						disponibilitaParametri: ["Asfalto", "Struttura"]
					});
				}}>Soc Manutenzione</button>
				<button style={{ height: 50, marginLeft: 30 }}onClick={() => {
					setUser({email:"pippo@atmi.it", categoria: "Societa Autostrada"});
				}}>Soc Autostrada</button>
				<button style={{ height: 50, marginLeft: 30 }}onClick={() => {
					setUser({email:"pippo@atmi.it", categoria: "Ministero"});
				}}>Ministero</button>
			</div>
		</div>
	);
}

export default HomeScreen;