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
						<Route path="/atmi/login" component={LoginScreen} />
						<Route path="/atmi/logout" component={Logout} />
						<Route path="/atmi/signin" component={SigninScreen} />
						<Route path="/atmi/infrastrutture" exact component={InfrScreen} />
						<Route path="/atmi/infr-info/:id" component={InfrInfo} />
						<Route path="/atmi/mappa" component={Mappa} />
						<Route path="/atmi/appalti" component={AppaltiScreen} />
						<Route path="/atmi/" exact component={HomeScreen} />
					</Switch>
				</div>
			</Router>
		</UserContext.Provider>
	);
}

export default App;
