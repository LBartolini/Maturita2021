import React, { useState, useContext } from 'react';
import {
	useHistory
} from "react-router-dom";
import GlobalVar from "@src/GlobalVar.js";
import { UserContext } from "@src/UserContext.js";
import './login.css';

const LoginScreen = () => {
	const { user, setUser } = useContext(UserContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	const handleSubmit = () => {
		let to_send = {
			email: email,
			password: password
		};

		fetch(GlobalVar.urlAPI + "/login.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(to_send)
		})
			.then(response => {
				if (response.status == 200) {
					return response.json();
				} else if (response.status == 403 || response.status == 401) {
					alert("Email/Password errati!");
					throw new Error;
				} else {
					alert("Errore");
					throw new Error;
				}
			}).then(data => {
				if (data.Categoria == "Societa Manutenzione") {
					setUser({
						email: to_send.email,
						categoria: data.Categoria,
						disponibilitaParametri: data.Disponibilita
					});
				} else {
					setUser({
						email: to_send.email,
						categoria: data.Categoria
					});
				}
				GlobalVar.token = data.Token;
				history.push("/");
			}).catch(error => console.log(error));

		setPassword("");
		setEmail("");
	}

	return (
		<div className="root-login router-content">
			<div className="form-login">
				<h2>Accesso</h2>
				<div className="form-login-row">
					<label className="form-login-label">Email</label>
					<input type="text" className="form-login-input" value={email} onChange={e => setEmail(e.target.value)} />
				</div>
				<div className="form-login-row">
					<label className="form-login-label">Password</label>
					<input type="password" className="form-login-input" value={password} onChange={e => setPassword(e.target.value)} />
				</div>
				<div className="form-login-row">
					<a onClick={() => { history.push("/signin") }} className="ancora-form">Non hai un account?<br /> Registrati</a>
					<button onClick={handleSubmit}>Accedi</button>
				</div>
			</div>
		</div>
	);
}

export default LoginScreen;