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
		<div className="root-signin router-content">
			<div className="form-signin">
				<h2>Registrazione</h2>
				<div className="form-signin-row">
					<label className="form-signin-label">Email</label>
					<input type="text" className="form-signin-input" value={email} onChange={e => setEmail(e.target.value)}/>
				</div>
				<div className="form-signin-row">
					<label className="form-signin-label">Password</label>
					<input type="password" className="form-signin-input" value={password} onChange={e => setPassword(e.target.value)}/>
				</div>
				<div className="form-signin-row">
					<a onClick={() => {history.push("/login")}} className="ancora-form">Torna al login</a>
					<button onClick={handleSubmit}>Registrati</button>
				</div>
			</div>
		</div>
	);
}

export default SigninScreen;