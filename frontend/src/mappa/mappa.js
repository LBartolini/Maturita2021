import React, { useState, useEffect } from 'react';
import {
	useHistory
} from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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
	const [markers, setMarkers] = useState([{
		position: [43.869560, 12.5558136],
		nome: "ponte X",
	},
	{
		position: [43.769560, 10.5558136],
		nome: "ponte X",
	},
	{
		position: [43.469560, 11.2558136],
		nome: "ponte X",
	},
	{
		position: [43.169560, 10.7558136],
		nome: "ponte X",
	},
	{
		position: [44.769560, 11.6558136],
		nome: "ponte X",
	},
	{
		position: [45.769560, 10.7558136],
		nome: "ponte X",
	}]);
	const starter_position = [43.416667 , 11]

	return (
		<div className="mappa">
			<MapContainer center={starter_position} zoom={9} scrollWheelZoom={true} className="map-component">
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{markers.map((marker) => {
					return (<Marker position={marker.position}>
						<Popup>
							{marker.nome}
							<br/>
							<button onClick={() => console.log(marker.nome)}>Vai al ponte</button>
						</Popup>
					</Marker>)
				})
				}
			</MapContainer>
		</div>
	)
};

export default Mappa;