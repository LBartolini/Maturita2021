import LoginScreen from '@src/login/login.js';
import SigninScreen from '@src/signin/signin.js';
import NavBar from '@src/navbar/navbar.js';
import HomeScreen from '@src/home/home.js';
import InfrScreen from '@src/infrastrutture/infrastrutture.js';
import {
	BrowserRouter as Router,
	Switch,
	Route
  } from "react-router-dom";
import GlobalVar from '@src/GlobalVar.js';
import './global.css';

function App() {
  return (
    <Router>
		<NavBar />
		<Switch className="router">
			<Route path="/login" component={LoginScreen} />
			<Route path="/signin" component={SigninScreen} />
			<Route path="/infrastrutture" component={InfrScreen} />
			<Route path="/home" component={HomeScreen} />
			<Route path="/" component={HomeScreen} />
		</Switch>
    </Router>
  );
}

export default App;
