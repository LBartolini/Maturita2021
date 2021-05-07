import React, { useState } from 'react';
import {
	useHistory
} from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './mappa.css';
import 'leaflet/dist/leaflet.css';

const Mappa = () => {
	const [markers, setMarkers] = useState([]);
	const starter_position = [51.505, -0.09]

	return (
		<div className="mappa">
			<MapContainer center={starter_position} zoom={13} scrollWheelZoom={false} className="map-component">
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={starter_position}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
      				</Popup>
				</Marker>
			</MapContainer>
		</div>
	)
};

export default Mappa;