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

	const checkUrlLocale = GlobalVar.urlAPI === "http://192.168.1.10/atmi-api";
	const checkUrlRemoto = GlobalVar.urlAPI === "http://lbartolini.ddns.net:3000/atmi-api";

	const [urlLocale, setUrlLocale] = useState(checkUrlLocale);
	const [urlRemoto, setUrlRemoto] = useState(checkUrlRemoto);
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
				<div>URL LOCALE <input type="radio" value="locale" checked={urlLocale} 
				onChange={() => { 
					setUrlLocale(true);
					setUrlRemoto(false);
					GlobalVar.urlAPI = "http://192.168.1.10/atmi-api";
				 }}/></div>
				<div>URL REMOTO <input type="radio" value="remoto" checked={urlRemoto}
				onChange={() => { 
					setUrlRemoto(true);
					setUrlLocale(false);
					GlobalVar.urlAPI = "http://lbartolini.ddns.net:3000/atmi-api";
				 }}/></div>
			</div>
		</div>
	);
}

export default HomeScreen;