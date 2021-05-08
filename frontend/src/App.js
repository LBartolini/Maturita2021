import LoginScreen from '@src/login/login.js';
import SigninScreen from '@src/signin/signin.js';
import NavBar from '@src/navbar/navbar.js';
import Mappa from '@src/mappa/mappa.js';
import HomeScreen from '@src/home/home.js';
import InfrScreen from '@src/infrastrutture/infrastrutture.js';
import { UserContext } from '@src/UserContext.js';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import './global.css';
import {useState, useMemo} from 'react';

function App() {
	const [user, setUser] = useState({
		nome: "Pippo",
		categoria: "Ministero",
	});

	const value = useMemo(() => ({ user, setUser }), [user, setUser]);

	return (
		<UserContext.Provider value={value}>
			<Router>
				<div className="flex-body-container">
					<NavBar />
					<Switch className="router">
						<Route path="/login" component={LoginScreen} />
						<Route path="/signin" component={SigninScreen} />
						<Route path="/infrastrutture" exact component={InfrScreen} />
						<Route path="/infrastrutture/mappa" component={Mappa} />
						<Route path="/home" component={HomeScreen} />
						<Route path="/" exact component={HomeScreen} />
					</Switch>
				</div>
			</Router>
		</UserContext.Provider>
	);
}

export default App;
