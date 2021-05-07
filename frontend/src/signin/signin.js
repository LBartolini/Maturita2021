import React, {useState} from 'react';
import {
	useHistory
  } from "react-router-dom";
import './signin.css';

const SigninScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [el_alta, setEl_Alta] = useState(false);
	const [el_bassa, setEl_Bassa] = useState(false);	
	const [struttura, setStruttura] = useState(false);
	const [asfalto, setAsfalto] = useState(false);	
	const history = useHistory();

	const handleSubmit = () => {
		console.log(el_alta);
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
				<label className="form-signin-label" >Parametri di manutenzione:</label>
				<div className="form-signin-row">
					<label className="form-signin-label">Elettricità Alta</label>
					<input type="checkbox" className="form-signin-input" onChange={e => {setEl_Alta(e.target.value)}}/>
				</div>
				<div className="form-signin-row">
					<label className="form-signin-label">Elettricità Bassa</label>
					<input type="checkbox" className="form-signin-input" onChange={e => setEl_Bassa(e.target.value)}/>
				</div>
				<div className="form-signin-row">
					<label className="form-signin-label">Struttura</label>
					<input type="checkbox" className="form-signin-input" onChange={e => setStruttura(e.target.value)}/>
				</div>
				<div className="form-signin-row">
					<label className="form-signin-label">Asfalto</label>
					<input type="checkbox" className="form-signin-input" onChange={e => setAsfalto(e.target.value)}/>
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