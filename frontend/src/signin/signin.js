import React, { useState } from 'react';
import {
	useHistory
} from "react-router-dom";
import './signin.css';
import GlobalVar from "@src/GlobalVar.js";

function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

const SigninScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [elettricita, setElettricita] = useState(false);
	const [struttura, setStruttura] = useState(false);
	const [asfalto, setAsfalto] = useState(false);
	const history = useHistory();

	const handleSubmit = () => {
		if (email != "" && validateEmail(email) && password.length > 0) {
			// email e password settate
			if (elettricita || struttura || asfalto) {
				// è stato scelto almeno un parametro
				let to_send = {
					email: email,
					password: password,
					parametri: {
						elettricita: elettricita,
						asfalto: asfalto,
						struttura: struttura
					}
				};

				fetch(GlobalVar.urlAPI + "/signin.php", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(to_send)
				})
					.then(response => {
						if (response.status == 200) {
							return response.json();
						}else if(response.status == 410){
							alert("Email non disponibile!");
							throw new Error;
						} else {
							alert("Errore");
							throw new Error;
						}
					}).then(data => {
						history.push("/");
					}).catch(error => console.log(error));
			}
		}
	}

	return (
		<div className="root-signin router-content">
			<div className="form-signin">
				<h2>Registrazione</h2>
				<div className="form-signin-row">
					<label className="form-signin-label">Email</label>
					<input type="text" className="form-signin-input" value={email} onChange={e => setEmail(e.target.value)} />
				</div>
				<div className="form-signin-row">
					<label className="form-signin-label">Password</label>
					<input type="password" className="form-signin-input" value={password} onChange={e => setPassword(e.target.value)} />
				</div>
				<label className="form-signin-label" >Parametri di manutenzione:</label>
				<div className="form-signin-row">
					<label className="form-signin-label">Elettricità</label>
					<input type="checkbox" className="form-signin-input" value={elettricita} onChange={e => { setElettricita(e.target.checked) }} />
				</div>
				<div className="form-signin-row">
					<label className="form-signin-label">Struttura</label>
					<input type="checkbox" className="form-signin-input" onChange={e => setStruttura(e.target.checked)} />
				</div>
				<div className="form-signin-row">
					<label className="form-signin-label">Asfalto</label>
					<input type="checkbox" className="form-signin-input" onChange={e => setAsfalto(e.target.checked)} />
				</div>
				<div className="form-signin-row">
					<a onClick={() => { history.push("/login") }} className="ancora-form">Torna al login</a>
					<button onClick={handleSubmit}>Registrati</button>
				</div>
			</div>
		</div>
	);
}

export default SigninScreen;