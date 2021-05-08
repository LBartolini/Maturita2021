import React, {useContext} from 'react';
import {UserContext} from '@src/UserContext.js';
import './infrInfo.css';
import {
	useParams,
  } from "react-router-dom";

const InfrInfo = () => {
	const {user, setUser} = useContext(UserContext);
	const { id } = useParams();

	return (
		<div className="infrInfo router-content">
			<p>{id}</p>
		</div>
	);
}

export default InfrInfo;