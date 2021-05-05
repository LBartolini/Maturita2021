import React, {useState} from 'react';
import {
	useHistory
  } from "react-router-dom";
import './login.css';

const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	const handleSubmit = () => {
		setPassword("");
		setEmail("");
		history.push("/signin");
	}

	return (
		<div className="root-login router-content">
			<div className="form-login">
				<h2>Accesso</h2>
				<div className="form-login-row">
					<label className="form-login-label">Email</label>
					<input type="text" className="form-login-input" value={email} onChange={e => setEmail(e.target.value)}/>
				</div>
				<div className="form-login-row">
					<label className="form-login-label">Password</label>
					<input type="password" className="form-login-input" value={password} onChange={e => setPassword(e.target.value)}/>
				</div>
				<div className="form-login-row">
					<a onClick={() => {history.push("/signin")}} className="ancora-form">Non hai un account?<br/> Registrati</a>
					<button onClick={handleSubmit}>Accedi</button>
				</div>
			</div>
		</div>
	);
}

export default LoginScreen;