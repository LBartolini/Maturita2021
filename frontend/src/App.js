import LoginScreen from '@src/login/login.js';
import Logout from '@src/logout.js';
import SigninScreen from '@src/signin/signin.js';
import InfrInfo from '@src/infrInfo/infrInfo.js';
import NavBar from '@src/navbar/navbar.js';
import Mappa from '@src/mappa/mappa.js';
import HomeScreen from '@src/home/home.js';
import InfrScreen from '@src/infrastrutture/infrastrutture.js';
import AppaltiScreen from '@src/appalti/appalti.js';
import { UserContext } from '@src/UserContext.js';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import './global.css';
import {useState, useMemo} from 'react';

function App() {
	const [user, setUser] = useState(null);

	const value = useMemo(() => ({ user, setUser }), [user, setUser]);

	return (
		<UserContext.Provider value={value}>
			<Router>
				<div className="flex-body-container">
					<NavBar />
					<Switch className="router">
						<Route path="/login" component={LoginScreen} />
						<Route path="/logout" component={Logout} />
						<Route path="/signin" component={SigninScreen} />
						<Route path="/infrastrutture" exact component={InfrScreen} />
						<Route path="/infr-info/:id" component={InfrInfo} />
						<Route path="/mappa" component={Mappa} />
						<Route path="/appalti" component={AppaltiScreen} />
						<Route path="/home" component={HomeScreen} />
						<Route path="/" exact component={HomeScreen} />
					</Switch>
				</div>
			</Router>
		</UserContext.Provider>
	);
}

export default App;
