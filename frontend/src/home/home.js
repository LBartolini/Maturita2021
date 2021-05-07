import React, {useState} from 'react';
import {
	useHistory
  } from "react-router-dom";
import './home.css';

const HomeScreen = () => {
	const history = useHistory();

	return (
		<div className="home router-content">
			<div className="header-title">
				<h1>Regione Toscana</h1>
				<h6>Stato di manutenzione di Ponti e Viadotti in Toscana</h6>
				<h6>Appalti e bandi di manutenzione</h6>
			</div>
			<div className="body-home">

			</div>
		</div>
	);
}

export default HomeScreen;