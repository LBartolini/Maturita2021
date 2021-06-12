import React, {useContext, useState} from 'react';
import {UserContext} from '@src/UserContext.js';
import {
	useHistory,
  } from "react-router-dom";
import GlobalVar from '@src/GlobalVar.js';
import './home.css';

const HomeScreen = () => {
	const history = useHistory();
	const {user, setUser} = useContext(UserContext);

	const [urlPersonalizzato, setUrlPersonalizzato] = useState(GlobalVar.urlAPI);
	// per cambiare solo un attributo dello stato setUser({...stato, attr: new_value})
	return (
		<div className="home router-content">
			<div className="header-title">
				<h1>Autostrade Toscana Manutenzione Infrastrutture</h1>
				<h2>ATMI</h2>
				<h6>Stato di manutenzione di Ponti e Viadotti in Toscana</h6>
				<h6>Appalti e bandi di manutenzione</h6>
				<br/>
				<h6>Eseguire l'accesso per entrare nel portale</h6>
			</div>
			<div className="radio-buttons">
				<div>URL LOCALE <input type="radio" value="locale" checked={urlPersonalizzato === "http://192.168.1.10/atmi-api"} 
				onChange={() => { 
					setUrlPersonalizzato("http://192.168.1.10/atmi-api")
				 }}/></div>
				<div>URL REMOTO <input type="radio" value="remoto" checked={urlPersonalizzato === "http://lbartolini.ddns.net/atmi-api"}
				onChange={() => { 
					setUrlPersonalizzato("http://lbartolini.ddns.net/atmi-api");
				 }}/></div>
				 <div>URL ATTUALE <input type="text" style={{width: 300}} value={urlPersonalizzato} 
				 onChange={(event) => setUrlPersonalizzato(event.target.value)}/>
				 <br/>
				 <button onClick={() => {
					 GlobalVar.urlAPI = urlPersonalizzato;
				 }}>Salva URL</button></div>
			</div>
		</div>
	);
}

export default HomeScreen;