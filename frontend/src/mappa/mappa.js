import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "@src/UserContext.js";
import {
	useHistory
} from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import GlobalVar from "@src/GlobalVar.js";
import './mappa.css';
import 'leaflet/dist/leaflet.css';
import Logout from "@src/logout.js";

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
	const [markers, setMarkers] = useState([]);
	const starter_position = [43.416667, 11]

	const fetchPuntiMappa = () => {
		fetch(GlobalVar.urlAPI+'/punti-mappa.php', {
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
			setMarkers(data);
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
			}else{
				// accenso consentito
				fetchPuntiMappa();
			}
		}else{
			//utente non ha fatto l'accesso
			history.push("/atmi/");
		}
	}, []);

	// inserire useEffect(..., []) per fetchare i dati dall'api

	return (
		<div className="mappa">
			<MapContainer center={starter_position} zoom={8} scrollWheelZoom={true} className="map-component">
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{markers.map((marker) => {
					return (
					<Marker position={marker.Coordinate} key={marker.Id}>
						<Popup>
							<p>{marker.Nome}</p>
							<p>Autostrada {marker.Autostrada}</p>
							<button onClick={() => history.push('/atmi/infr-info/' + marker.Id)}>INFO</button>
						</Popup>
					</Marker>)
				})
				}
			</MapContainer>
		</div>
	)
};

export default Mappa;