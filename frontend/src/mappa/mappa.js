import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "@src/UserContext.js";
import {
	useHistory
} from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import GlobalVar from "@src/GlobalVar.js";
import './mappa.css';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const Mappa = () => {
	const {user, setUser} = useContext(UserContext);
	const history = useHistory();
	const [markers, setMarkers] = useState([{
		position: [43.869560, 12.5558136],
		nome: "ponte X",
		id: 0
	},
	{
		position: [43.769560, 10.5558136],
		nome: "ponte X",
		id: 1
	},
	{
		position: [43.469560, 11.2558136],
		nome: "ponte X",
		id: 2
	},
	{
		position: [43.169560, 10.7558136],
		nome: "ponte X",
		id: 3
	},
	{
		position: [44.769560, 11.6558136],
		nome: "ponte X",
		id: 4
	},
	{
		position: [45.769560, 10.7558136],
		nome: "ponte X",
		id: 5
	}]);
	const starter_position = [43.416667, 11]

	useEffect(() => {
		//controllo utente
		if(user){
			//utente logged in
			if(user.categoria == "Societa Manutenzione"){
				setUser(null);
				GlobalVar.token = "";
				history.push("/");
			}
		}else{
			//utente non ha fatto l'accesso
			history.push("/");
		}
	}, []);

	// inserire useEffect(..., []) per fetchare i dati dall'api

	return (
		<div className="mappa">
			<MapContainer center={starter_position} zoom={9} scrollWheelZoom={true} className="map-component">
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{markers.map((marker) => {
					return (<Marker position={marker.position} key={marker.id}>
						<Popup>
							<p>{marker.nome}</p>
							<br />
							<button onClick={() => history.push('/infr-info/' + marker.id)}>INFO</button>
						</Popup>
					</Marker>)
				})
				}
			</MapContainer>
		</div>
	)
};

export default Mappa;