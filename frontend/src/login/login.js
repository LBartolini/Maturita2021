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
		<div className="root-login">
			<div className="form-login">
				<div className="form-row">
					<label>Email</label>
					<input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
				</div>
				<div className="form-row">
					<label>Password</label>
					<input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
				</div>
				<div className="form-row">
					<a onClick={() => {history.push("/signin")}} className="ancora-form">Non hai un account?<br/> Registrati</a>
					<button onClick={handleSubmit}>Accedi</button>
				</div>
			</div>
		</div>
	);
}

export default LoginScreen;