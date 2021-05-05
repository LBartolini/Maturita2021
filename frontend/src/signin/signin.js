import React, {useState} from 'react';
import {
	useHistory
  } from "react-router-dom";
import './signin.css';

const SigninScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	const handleSubmit = () => {
		setPassword("");
		setEmail("");
		history.push("/");
	}

	return (
		<div className="root-login">
			<div className="form-signin">
				<div className="form-row">
					<label>sus</label>
					<input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
				</div>
				<div className="form-row">
					<label>sus</label>
					<input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
				</div>
				<div className="form-row">
					<a onClick={() => {history.push("/")}} className="ancora-form">Indietro</a>
					<button onClick={handleSubmit}>Registrati</button>
				</div>
			</div>
		</div>
	);
}

export default SigninScreen;