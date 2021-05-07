import LoginScreen from '@src/login/login.js';
import SigninScreen from '@src/signin/signin.js';
import NavBar from '@src/navbar/navbar.js';
import Mappa from '@src/mappa/mappa.js';
import HomeScreen from '@src/home/home.js';
import InfrScreen from '@src/infrastrutture/infrastrutture.js';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import './global.css';

function App() {
	return (
		<Router>
			<div className="flex-body-container">
				<NavBar />
				<Switch className="router">
					<Route path="/login" component={LoginScreen} />
					<Route path="/signin" component={SigninScreen} />
					<Route path="/infrastrutture" exact component={InfrScreen} />
					<Route path="/infrastrutture/mappa" component={Mappa} />
					<Route path="/home" component={HomeScreen} />
					<Route path="/" component={HomeScreen} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
